import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
declare var weui: any;

@Component({
  selector: 'app-send-point',
  templateUrl: './send-point.component.html',
  styleUrls: ['./send-point.component.css']
})
export class SendPointComponent implements OnInit {

  public uid;
  public userInfo;
  public growth;
  public desc;
  public type;
  public labelList: Object[];
  public employeeList: Object[];
  public kgId;
  public rankTypeList;
  public rankType;
  public growthvalueitemList={};

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.uid = this.userService.getCurrentUserId();
    this.userService.getGrowthVauleLabelList(this.uid).then((data) => {
      this.labelList = data;
      this.labelList[0]['is_choose'] = true;
    })
    this.userService.getUserInfo(this.uid).then((userInfo) => {
      this.userInfo = userInfo;
      this.kgId=userInfo.employee_kindergarten_id;
      this.userService.getDepartmentEmployeeList(this.uid, userInfo.employee_kindergarten_id).then((data) => {
        this.employeeList = data;
        this.employeeList.forEach((depart) => {
          depart['is_hidde_list'] = true;
          depart['employee_list'].forEach((emp) => {
            emp.is_choose = false;
          })
        })
      })

      this.userService.getGrowthValueLabelList(this.uid,this.kgId).then((data)=>{
        data.growthvalueitem_list.forEach((item)=>{
          this.growthvalueitemList[item.kgsgrowthvalueitem_id]={
            desc:item.kgsgrowthvalueitem_dscp,
            value:item.kgsgrowthvalueitem_value
          }
        });
        this.rankTypeList = data.growthvalueitem_list.map((item) => {
          return {
            label: item.kgsgrowthvalueitem_name,
            value: item.kgsgrowthvalueitem_id
          }
        });
      })

    })
  }

  rankTypePicker() {
    const _modelThis = this;
    weui.picker(_modelThis.rankTypeList, {
      onConfirm: function (result) {
        _modelThis.rankType = result[0];
        _modelThis.desc=_modelThis.growthvalueitemList[result[0].value].desc;
        _modelThis.growth=_modelThis.growthvalueitemList[result[0].value].value;
      },
      id: 'rankTypePicker'
    });
  }


  refreshUserInfo() {
    this.userService.getUserInfo(this.uid).then((userInfo) => {
      this.userInfo = userInfo;
    })
  }

  toggleList(depart) {
    depart.is_hidde_list = !depart.is_hidde_list;
  }

  chooseLabel(label) {
    this.labelList.forEach((item) => { item['is_choose'] = false; })
    label['is_choose'] = !label['is_choose'];
  }

  chooseEmployee(emp) {
    emp['is_choose'] = !emp['is_choose'];
  }

  chooseAllEmployee(list) {
    list.forEach((emp) => {
      emp.is_choose = true;
    })
  }

  unChooseAllEmployee(list) {
    list.forEach((emp) => {
      emp.is_choose = !emp.is_choose;
    })
  }

  changeEmp(list, i) {
    list[i]['is_choose'] = !list[i]['is_choose'];
  }

  sendGrowth() {
    const empId = this.userInfo.employee_id;
    const employeeIdList = [].concat.apply([],
      this.employeeList.map((deartement) => deartement['employee_list']
        .filter((emp) => emp.is_choose)
        .map((emp) => emp.employee_id)
      )
    ).sort();
    const chooseType = this.labelList
      .filter((label) => label['is_choose'])
      .map(label => label['sendgrowthvaluelabel_id'])
      .pop();
    if (employeeIdList.length == 0) return weui.topTips('请选择员工！')
    if (!this.desc || !this.growth) return weui.topTips(`请填写${this.desc ? '成长值' : '说明'}！`)
    if (this.growth * employeeIdList.length > this.userInfo.employee_usable_value) return weui.topTips(`您的成长值不足`)

   

    weui.confirm(`确定花费总${this.growth * employeeIdList.length}成长值赠送给选中的${employeeIdList.length}人吗？`, () => {
      this.userService.sendGrowthToEmployee({
        employee_id: empId,
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
    const empId = this.userInfo.employee_id;
    const employeeIdList = [].concat.apply([],
      this.employeeList.map((deartement) => deartement['employee_list']
        .filter((emp) => emp.is_choose)
        .map((emp) => emp.employee_id)
      )
    ).sort();
    const chooseType = this.labelList
      .filter((label) => label['is_choose'])
      .map(label => label['sendgrowthvaluelabel_id'])
      .pop();
    if (employeeIdList.length == 0) return weui.topTips('请选择员工！')
    if (!this.desc || !this.growth) return weui.topTips(`请填写${this.desc ? '成长值' : '说明'}！`)
    if (this.growth * employeeIdList.length > this.userInfo.employee_usable_value) return weui.topTips(`您的成长值不足`)

    weui.confirm(`确定花费总${this.growth * employeeIdList.length}成长值转让给选中的${employeeIdList.length}人吗？`, () => {
      this.userService.setGrowthToEmployee({
        employee_id: empId,
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
