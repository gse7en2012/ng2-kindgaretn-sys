import { Component, OnInit, HostListener } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router, CanActivate } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  private host = 'http://kgswx.memtek.cn';
  private appId = 'wx002ce9d239bead3d';
  private loginUri = `${this.host}/wxapi/wx_login`;
  private stateUri = '/kgs/home';

  constructor(private userService: UserService, private router: Router) { }



  ngOnInit() {
    
    if (!this.userService.checkIsLogin()) {
      const wechatUri = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appId}&redirect_uri=${encodeURIComponent(this.loginUri)}&response_type=code&scope=snsapi_userinfo&state=${encodeURIComponent(this.stateUri)}`;
      location.href = wechatUri;
    } else {
      this.router.navigate(['/home']);
    }

  }

}
