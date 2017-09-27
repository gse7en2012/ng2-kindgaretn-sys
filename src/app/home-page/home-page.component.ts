import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router, CanActivate } from '@angular/router';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [UserService]
})
export class HomePageComponent implements OnInit {

  public championInfo: any = {
    'employee_head_imgurl': 'assets/img/avatar.png',
    'employee_background_url': '/assets/img/bg.jpg'
  };
  public userInfo: any = {
    'employee_head_imgurl': 'assets/img/avatar.png'
  }
  public employeeList: any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    const uid = this.userService.getCurrentUserId();
    this.userService.homePageApi().then((r) => {
      this.championInfo = r.champion_info;
      this.employeeList = r.employee_list;
      this.userInfo=r.my_info;
    })

    
  }

}
