import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
declare var weui: any;

@Component({
  selector: 'app-growth',
  templateUrl: './growth.component.html',
  styleUrls: ['./growth.component.css'],
  providers: [UserService]
})
export class GrowthComponent implements OnInit {

  public recordList: any = [];
  public title: string;
  public showCancel: boolean;
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit() {
    const uid = this.userService.getCurrentUserId();
    this.route.params.subscribe((params: Params) => {
      const type = params["type"];
      const eid = params['eid'];
      const field = type == 'gain' ? 'recipient_list' : 'donor_list'
      this.title = type == 'gain' ? '获得' : '赠送';
      this.showCancel = type == 'gain' ? false : true;
      this.userService.getGrowthList(uid, type, eid).then((data) => {
        this.recordList = data[field];
        this.recordList.forEach((item) => {
          item.growthvalue_add_time = item.growthvalue_add_time.split(' ')[0];
        })
      })
    });
  }

  cancelGrowth(gId) {
    // weui.confirm('确定撤销？',()=>{
      // console.log(this);
      
      this.userService.cancelGrowthValue({
        growthvalue_id: gId
      }).then(() => {
        weui.alert('撤销成功！',()=>{
          location.reload();
        })

      })
    // },()=>{

    // })
    
  }

}
