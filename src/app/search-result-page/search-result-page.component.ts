import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { UserService } from '../service/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-search-result-page',
  templateUrl: './search-result-page.component.html',
  styleUrls: ['./search-result-page.component.css'],
  animations: [routerTransition()],
  host: { '[@routerTransition]': '' },
  providers: [UserService]
})
export class SearchResultPageComponent implements OnInit {

  public start: string;
  public end: string;
  public rankType:string;
  public list: any;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.start = params['start'];
      this.end = params['end'];
      this.rankType = params['rank_type'];
      this.userService.getRankInfo(this.userService.getCurrentUserId(), this.start, this.end, this.rankType).then(data => {
        this.list = data.employee_list;
        // this.list=this.list.concat(this.list);
      })

    });
  }

  onScroll(event) {
    // this.list=this.list.concat(this.list);
  }

}
