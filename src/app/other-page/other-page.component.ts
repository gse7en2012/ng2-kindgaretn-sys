import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
declare var weui: any;

@Component({
  selector: 'app-other-page',
  templateUrl: './other-page.component.html',
  styleUrls: ['./other-page.component.css'],
  providers: [UserService]
})
export class OtherPageComponent implements OnInit {

  private employeeId;
  public isMyself: boolean = false;
  public userInfo: any = {
    'employee_head_imgurl': 'assets/img/avatar.png',
  }
  public labelList: Object[];
  public departmentName;
  public growth;
  public desc;
  public type;
  public currentLoginUserInfo;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.employeeId = params['uid'];
      this.refreshUserInfo().then(() => {
        if (this.employeeId != this.userService.getCurrentEmployeeId()) {
          this.userService.getPersonalInfo(this.userService.getCurrentUserId(), this.employeeId).then(data => {
            this.userInfo = data;
          })
        } else {
          this.isMyself = true;
          this.userInfo = this.currentLoginUserInfo;
        }
        //查找部门
        this.userService.getGrowthVauleLabelList(this.userService.getCurrentUserId()).then((data) => {
          this.labelList = data;
          this.labelList[0]['is_choose'] = true;
        })
      });
    });
  }

  chooseLabel(label) {
    this.labelList.forEach((item) => { item['is_choose'] = false; })
    label['is_choose'] = !label['is_choose'];
  }

  refreshUserInfo() {
    return this.userService.getUserInfo(this.userService.getCurrentUserId()).then(data => {
      this.currentLoginUserInfo = data;
    })
  }


  sendGrowth() {
    const employeeIdList = [this.userInfo.employee_id]
    const chooseType = this.labelList
      .filter((label) => label['is_choose'])
      .map(label => label['sendgrowthvaluelabel_id'])
      .pop();
    if (!this.desc || !this.growth) return weui.topTips(`请填写${this.desc ? '成长值' : '说明'}！`)
    if (this.growth > this.currentLoginUserInfo.employee_usable_value) return weui.topTips(`您的成长值不足`)

    weui.confirm(`确定花费总${this.growth}成长值赠送给${this.userInfo.employee_name}吗？`, () => {
      this.userService.sendGrowthToEmployee({
        growthvalue: this.growth,
        description: this.desc,
        type: chooseType,
        employee_id_list: employeeIdList
      }).then((data) => {
        weui.toast('赠送成功！')
        this.refreshUserInfo();
      }).catch((e) => {
        weui.alert(e)
      })
    }, () => { console.log('no') });
  }


  setGrowth() {
    const employeeIdList = [this.userInfo.employee_id]
    const chooseType = this.labelList
      .filter((label) => label['is_choose'])
      .map(label => label['sendgrowthvaluelabel_id'])
      .pop();
    if (!this.desc || !this.growth) return weui.topTips(`请填写${this.desc ? '成长值' : '说明'}！`)
    if (this.growth > this.currentLoginUserInfo.employee_usable_value) return weui.topTips(`您的成长值不足`)

    weui.confirm(`确定花费总${this.growth}成长值转让给${this.userInfo.employee_name}吗？`, () => {
      this.userService.setGrowthToEmployee({
        value: this.growth,
        description: this.desc,
        type: chooseType,
        employee_id_list: employeeIdList
      }).then((data) => {
        weui.toast('转让成功！');
        this.refreshUserInfo();
      }).catch((e) => {
        weui.alert(e)
      })
    }, () => { console.log('no') });
  }

}
