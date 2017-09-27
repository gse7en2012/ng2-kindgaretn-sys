import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { UserService } from '../service/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-department-page',
  templateUrl: './department-page.component.html',
  styleUrls: ['./department-page.component.css'],
  animations: [routerTransition()],
  host: { '[@routerTransition]': '' },
  providers: [UserService]
})
export class DepartmentPageComponent implements OnInit {

  public departmentList: any;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit() {
    const uid = this.userService.getCurrentUserId();
    this.userService.getUserInfo(uid).then((userInfo) => {
      this.userService.getKgDepartmentList(uid, userInfo.employee_kindergarten_id).then((data) => {
        this.departmentList = data.kindergarten_list;
        // this.departmentList = this.departmentList.concat(data.kindergarten_list);
        // this.departmentList = this.departmentList.concat(data.kindergarten_list);
        // this.departmentList = this.departmentList.concat(data.kindergarten_list);
        // this.departmentList = this.departmentList.concat(data.kindergarten_list);
        // this.departmentList = this.departmentList.concat(data.kindergarten_list)
      })
    })
  }

  jump(did,name){
    //['employee_list/'+department.department_id+'?name='+department.department_name]
    this.router.navigate(['/me/department/employee_list'], { queryParams: { dId:did,name: name } });
  }

}
