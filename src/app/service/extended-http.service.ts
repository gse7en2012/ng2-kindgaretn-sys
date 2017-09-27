import { Injectable } from '@angular/core';
import { Request, XHRBackend, RequestOptions, Response, Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
// import { UserService } from './user.service';

// import { AuthService } from './auth/auth.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
declare var weui: any;

@Injectable()
export class ExtendedHttpService extends Http {

  constructor(backend: XHRBackend, defaultOptions: RequestOptions, private router: Router,private cookieService:CookieService
    //,private userService:UserService
    // private authService: AuthService
  ) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    //do whatever 
    if (typeof url === 'string') {
      if (!options) {
        options = { headers: new Headers() };
      }
      this.setHeaders(options);
    } else {
      this.setHeaders(url);
    }

    return super.request(url, options).catch(this.catchErrors());
  }

  private catchErrors() {

    const errMsg = {
      '400': '参数错误',
      '401': '没有权限',
      '404': '没有该接口',
      '405': '操作失败，积分不足',
      '444': '鉴权失败，请重新登录',
      '445': '请重新登录',
      '500': '服务器错误'
    }

    return (res: Response) => {

      if (errMsg[res.status]) {
        if (res.status === 444 || res.status === 445) {
          //handle authorization errors
          //in this example I am navigating to logout route which brings the login screen
          weui.alert('鉴权失败,请重新登录');
          this.cookieService.remove('kgs_access_token');
          this.router.navigate(['/login']);
          return Observable.of(res);
        }
        // alert(errMsg[res.status]);
        weui.alert(errMsg[res.status])
        return Observable.throw(errMsg[res.status]);
      }
      return Observable.throw(res);
    };
  }

  private setHeaders(objectToSetHeadersTo: Request | RequestOptionsArgs) {
    //add whatever header that you need to every request
    //in this example I add header token by using authService that I've created
    // objectToSetHeadersTo.headers.set('Token', this.authService.getToken());
  }
}