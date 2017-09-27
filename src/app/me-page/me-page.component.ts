import { Component, OnInit,NgZone } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router, CanActivate } from '@angular/router';

declare var plupload: any;
declare var Qiniu: any;
declare var QiniuJsSDK: any;
declare var weui: any;

@Component({
  selector: 'app-me-page',
  templateUrl: './me-page.component.html',
  styleUrls: ['./me-page.component.css'],
  providers: [UserService]
})
export class MePageComponent implements OnInit {

  public userInfo: any = {
    employee_head_imgurl: 'assets/img/avatar.png'
  };
  public groupList;
  public group;
  public isGm: boolean = false;

  constructor(private userService: UserService, private router: Router,private zone:NgZone) { }

  ngOnInit() {
    const uid = this.userService.getCurrentUserId();
    this.isGm = this.userService.checkIsGm();
    this.userService.getUserInfo(uid).then((userInfo) => {
      this.userInfo = userInfo;
      if (!this.userInfo.growthvalue_sum_value) this.userInfo.growthvalue_sum_value = 0;
      this.userInfo.growth_percent = this.userInfo.growthvalue_sum_value / this.userInfo.level_need_growth_value * 100 + '%';
      this.userService.getKgGroupList(uid,userInfo.employee_kindergarten_id).then(kgGroupList=>{
        this.groupList=kgGroupList.kindergarten_list.map((item) => {
          return {
            label:(item.is_cur_kindergarten==1?'（当前）':'')+ item.kindergarten_name+ (item.is_belong_kindergarten==1?'（所属）':''),
            value: item.kindergarten_id
          }
        });
      })
    })

    const uploadCoverImg = Qiniu.uploader(this.getUploadOpts());
  }


  chooseGroupList() {
    const _modelThis = this;
    console.log(_modelThis.groupList);

    weui.picker(_modelThis.groupList, {
      onConfirm: function (result) {
        _modelThis.group = result[0];
        _modelThis.setGroupAction(_modelThis.group.value);
      },
      id: 'groupPicker'
    });
  }


  setGroupAction(kgId){
    this.userService.setGroup({
      kindergarten_id:kgId
    }).then(()=>{
      weui.toast('选择成功',function(){
          location.reload();
      });
    })
  }

  refreshUserInfo(){
    this.userService.getUserInfo(this.userService.getCurrentUserId()).then((userInfo) => {
      this.userInfo = userInfo;
      if (!this.userInfo.growthvalue_sum_value) this.userInfo.growthvalue_sum_value = 0;
      this.userInfo.growth_percent = this.userInfo.growthvalue_sum_value / this.userInfo.level_need_growth_value * 100 + '%';
    })
  }

  getQiniuToken() {
    return this.userService.getQiniuUploadToken(this.userService.getCurrentUserId()).then((r) => {
      return r.uptoken;
    })
  }

  getQiniuTokenUrl() {
    const token = this.userService.getAccessToken();
    return `/wxapi/qiniu_upload_token?access_token=${encodeURIComponent(token)}&user_id=${this.userService.getCurrentUserId()}`;
  }

  postCoverImg(imgUrl) {
    return this.userService.postCoverImg({
      user_id: this.userService.getCurrentUserId(),
      cover_img_url: imgUrl
    }).then(()=>{
      this.userInfo.employee_background_url=imgUrl;
      // this.refreshUserInfo();
      return Promise.resolve();
    })
  }

  private getUploadOpts() {
    let loading;
    const _self = this;
    return {
      runtimes: 'html5,flash,html4',      // 上传模式，依次退化
      browse_button: 'cover-upload',         // 上传选择的点选按钮，必需
      //uptoken_func: this.getQiniuToken(),
      //uptoken_url: '/wxapi/qiniu_upload_token',         // Ajax请求uptoken的Url，强烈建议设置（服务端提供）
      uptoken_url: this.getQiniuTokenUrl(),
      // uptoken: 'POQvaC2kzeErHALP6TVgVrWAB3_WLQG--ti5Wfmz:SxHtMD5CRdVVmtr88BtjuWNELc0=:eyJtaW1lTGltaXQiOiJpbWFnZS9qcGVnO2ltYWdlL3BuZyIsInNjb3BlIjoieWR0LXBhcnRuZXIiLCJkZWFkbGluZSI6MTQ5NjcyMDA5OX0=',
      get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
      domain: 'http://os4xhdnwq.bkt.clouddn.com/',     // bucket域名，下载资源时用到，必需
      max_file_size: '500mb',             // 最大文件体积限制
      max_retries: 3,                     // 上传失败最大重试次数
      dragdrop: true,                     // 开启可拖曳上传
      drop_element: 'container',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
      chunk_size: '4mb',                  // 分块上传时，每块的体积
      auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
      init: {
        'FilesAdded': function (up, files) {
          plupload.each(files, function (file) {
            // 文件添加进队列后，处理相关的事情
          });
        },
        'BeforeUpload': function (up, file) {
          // 每个文件上传前，处理相关的事情
        },
        'UploadProgress': function (up, file) {
          loading = weui.loading('正在上传');
        },
        'FileUploaded': function (up, file, info) {
          const domain = up.getOption('domain');
          const res = JSON.parse(info);
          _self.zone.run(() => {
            _self.postCoverImg(domain + res.key).then(() => {
              weui.toast('上传成功');
              loading.hide();
            });
          })
         

        },
        'Error': function (up, err, errTip) {
          loading.hide();
          weui.alert(err.response)
        },
        'UploadComplete': function () {
          //队列文件处理完毕后，处理相关的事情
        },
        'Key': function (up, file) {
          // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
          // 该配置必须要在 unique_names: false , save_key: false 时才生效
          var key = 'kgs_cover_' + (new Date()).valueOf() + "." + file.name.split('.')[1];
          // do something with key here
          return key
        }
      }
    }
  }




}
