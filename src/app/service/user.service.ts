import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {


  private getHttpRequest(url, params) {
    return this.http.get(url, { search: params })
      .map(res => res.json())
      .toPromise()
      .then((data) => {
        if (data.err_code === 200) {
          return data.result;
        } else {
          return Promise.reject(data.msg || '返回数据格式出错！');
        }
      })
  }

  private generateHttpPostSearchParams(opts) {
    const token = this.cookieService.get('kgs_access_token');
    const postData = Object.assign({
      user_id:this.cookieService.get('kgs_user_id'),
      access_token: token
    }, opts)
    return postData;
  }



  constructor(private cookieService: CookieService, private http: Http) { }

  /**
   * kgs_access_token=AJWiVUIef3rni63AW1b8GyzCJwnE23RphujNYSK1DA5MSH9yqXsw065JpoYjPAX1ziS%2BQKLaBbw9tUWDYxFVZnM2ZP%2BEL%2F408HF2hkhcZN6xgLtS1N39i9ROU8OnQ5Dvivj7jW4aR0MwwNzp9jwLfZW29GmjzhC3SiFywTfsej4%3D; Expires=Sun, 23-Jul-17 07:33:38 GMT; Domain=rzywx.szrzy.com.cn; Path=/
  Set-Cookie:kgs_user_id=7; Expires=Sun, 23-Jul-17 07:33:38 GMT; Domain=rzywx.szrzy.com.cn; Path=/
   */

  public logOut(){
    return this.cookieService.remove('kgs_access_token');
  }

  public checkIsLogin() {
    return !!this.cookieService.get('kgs_access_token');
  }

  public checkIsGm() {
    return !!this.cookieService.get('kgs_is_gm');
  }

  public getCurrentUserId() {
    return this.cookieService.get('kgs_user_id');
  }

  public getCurrentEmployeeId() {
    return this.cookieService.get('kgs_employee_id');
  }

  public getAccessToken(){
    return this.cookieService.get('kgs_access_token');
  }


  public homePageApi(index?: number, page?: number) {
    const token = this.cookieService.get('kgs_access_token');
    const params: URLSearchParams = new URLSearchParams();
    params.set('user_id', this.cookieService.get('kgs_user_id'));
    if (index) params.set('index', index.toString());
    if (page) params.set('page', page.toString());

    return this.getHttpRequest(`/wxapi/homepage?access_token=${encodeURIComponent(token)}`, params);
  }

  public getUserInfo(uid) {
    const token = this.cookieService.get('kgs_access_token');
    const params: URLSearchParams = new URLSearchParams();
    params.set('user_id', uid);
    return this.getHttpRequest(`/wxapi/my_info?access_token=${encodeURIComponent(token)}`, params);
  }

  public getPersonalInfo(uid, employeeId) {
    const token = this.cookieService.get('kgs_access_token');
    const params: URLSearchParams = new URLSearchParams();
    params.set('user_id', uid);
    params.set('employee_id', employeeId);
    return this.getHttpRequest(`/wxapi/personal_homepage?access_token=${encodeURIComponent(token)}`, params);
  }

  public getRankInfo(uid, startTime?, endTime?, rankType?, index?, size?) {
    const token = this.cookieService.get('kgs_access_token');
    const params: URLSearchParams = new URLSearchParams();
    params.set('user_id', uid);
    if (startTime) params.set('start_time', startTime);
    if (endTime) params.set('end_time', endTime);
    if (rankType) params.set('ranking_type', rankType);
    if (index) params.set('index', index);
    if (size) params.set('size', size);

    return this.getHttpRequest(`/wxapi/ranking?access_token=${encodeURIComponent(token)}`, params);

  }

  public getRankType(uid) {
    ///wxapi/ranking_type 
    const token = this.cookieService.get('kgs_access_token');
    const params: URLSearchParams = new URLSearchParams();
    params.set('user_id', uid);
    return this.getHttpRequest(`/wxapi/ranking_type?access_token=${encodeURIComponent(token)}`, params);
  }

  public getGrowthValueLabelList(uid,kgId) {
    ///wxapi/ranking_type 
    const token = this.cookieService.get('kgs_access_token');
    const params: URLSearchParams = new URLSearchParams();
    params.set('user_id', uid);
    params.set('kindergarten_id', kgId);
    return this.getHttpRequest(`/wxapi/growthvalueitem_list?access_token=${encodeURIComponent(token)}`, params);
  }

  //
  public getGrowthList(uid, type, eid, page?, size?) {
    const uri = type == 'gain' ? '/wxapi/growthvalue_recipient_record' : '/wxapi/growthvalue_donor_record'
    const token = this.cookieService.get('kgs_access_token');
    const params: URLSearchParams = new URLSearchParams();
    params.set('user_id', uid);
    params.set('employee_id', eid);
    if (page) params.set('index', page);
    if (size) params.set('size', size);

    return this.getHttpRequest(`${uri}?access_token=${encodeURIComponent(token)}`, params);

  }

  public getKgDepartmentList(uid, kindergarten_id) {
    ///wxapi/department_list
    const token = this.cookieService.get('kgs_access_token');
    const params: URLSearchParams = new URLSearchParams();
    params.set('user_id', uid);
    params.set('kindergarten_id', kindergarten_id);

    return this.getHttpRequest(`/wxapi/department_list?access_token=${encodeURIComponent(token)}`, params);

  }

  public getTimeline(uid, kindergarten_id) {
    ///wxapi/growthvalue_record
    const token = this.cookieService.get('kgs_access_token');
    const params: URLSearchParams = new URLSearchParams();
    params.set('user_id', uid);
    params.set('kindergarten_id', kindergarten_id);

    return this.getHttpRequest(`/wxapi/growthvalue_record?access_token=${encodeURIComponent(token)}`, params);
  }

  public getGrowthVauleLabelList(uid){
    const token = this.cookieService.get('kgs_access_token');
    const params: URLSearchParams = new URLSearchParams();
    params.set('user_id', uid);

    return this.getHttpRequest(`/wxapi/sendgrowthvaluelabel_list?access_token=${encodeURIComponent(token)}`, params);
  }

  public getDepartmentEmployeeList(uid,kgId){
    const token = this.cookieService.get('kgs_access_token');
    const params: URLSearchParams = new URLSearchParams();
    params.set('user_id', uid);
    params.set('kindergarten_id', kgId);
    return this.getHttpRequest(`/wxapi/employee_list?access_token=${encodeURIComponent(token)}`, params);
  }

  public getDepartmentEmployeeListByDepartmentId(uid,dId){
    const token = this.cookieService.get('kgs_access_token');
    const params: URLSearchParams = new URLSearchParams();
    params.set('user_id', uid);
    params.set('department_id', dId);
    return this.getHttpRequest(`/wxapi/department_employee_list?access_token=${encodeURIComponent(token)}`, params);
  }


  public sendGrowthToEmployee(opts){
    const postData=this.generateHttpPostSearchParams(opts);
    return this.http.post(`/wxapi/send_growthvalue`, postData)
    .map(res => res.json()).toPromise()
    .then((data) => {
      return data;
    })
  }


  public cancelGrowthValue(opts){
    const postData=this.generateHttpPostSearchParams(opts);
    return this.http.post(`/wxapi/cancel_growthvalue`, postData)
    .map(res => res.json()).toPromise()
    .then((data) => {
      return data;
    })
  }

  public setGrowthToEmployee(opts){
    const postData=this.generateHttpPostSearchParams(opts);
    return this.http.post(`/wxapi/set_value`, postData)
    .map(res => res.json()).toPromise()
    .then((data) => {
      return data;
    })
  }

  public setGroup(opts){
    const postData=this.generateHttpPostSearchParams(opts);
    return this.http.post(`/wxapi/kindergartengroup_kindergarten`, postData)
    .map(res => res.json()).toPromise()
    .then((data) => {
      return data;
    })
  }

  ///wxapi/cover_img
  public postCoverImg(opts){
    const postData=this.generateHttpPostSearchParams(opts);
    return this.http.post(`/wxapi/cover_img`, postData)
    .map(res => res.json()).toPromise()
    .then((data) => {
      return data;
    })
  }

  public getQiniuUploadToken(uid){
    const token = this.cookieService.get('kgs_access_token');
    const params: URLSearchParams = new URLSearchParams();
    params.set('user_id', uid);

    return this.getHttpRequest(`/wxapi/qiniu_upload_token?access_token=${encodeURIComponent(token)}`, params);
  }


  public getKgGroupList(uid,kgId){
    const token = this.cookieService.get('kgs_access_token');
    const params: URLSearchParams = new URLSearchParams();
    params.set('user_id', uid);
    params.set('kindergarten_id', kgId);

    return this.getHttpRequest(`/wxapi/kindergartengroup_kindergarten_list?access_token=${encodeURIComponent(token)}`, params);
  }

}
