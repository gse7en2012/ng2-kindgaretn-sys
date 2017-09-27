import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { UserService } from '../../service/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  // animations: [routerTransition()],
  // host: { '[@routerTransition]': '' },
  providers: [UserService]
})
export class EmployeeComponent implements OnInit {

  public dId: string;
  public list: any;
  public name:string;
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.dId = params['dId'];
      this.name=params['name']
      
      this.userService.getDepartmentEmployeeListByDepartmentId(this.userService.getCurrentUserId(), this.dId).then(data => {
        this.list = data.employee_list;
        // this.list=this.list.concat(this.list);
      })
    });
    
  }

  onScroll(event) {
    // this.list=this.list.concat(this.list);
  }


}
