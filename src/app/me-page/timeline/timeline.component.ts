import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  providers: [UserService]
})
export class TimelineComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  public timelineList: any;

  ngOnInit() {
    const uid = this.userService.getCurrentUserId();
    this.userService.getUserInfo(uid).then((userInfo) => {
      this.userService.getTimeline(uid, userInfo.employee_kindergarten_id).then((data) => {
        this.timelineList = data.growthvalue_list;
      })
    })
  }

}
