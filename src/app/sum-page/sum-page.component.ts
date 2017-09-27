import { Component, OnInit, AfterViewInit } from '@angular/core';
// import { PickerModule } from 'ngx-weui/picker';
import { UserService } from '../service/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
declare var weui: any;
declare var moment: any;



@Component({
  selector: 'app-sum-page',
  templateUrl: './sum-page.component.html',
  styleUrls: ['./sum-page.component.css'],
  providers: [UserService]
})
export class SumPageComponent implements OnInit, AfterViewInit {
  public dateStartTime: string = '开始时间';
  public dateEndTime: string = '结束时间';
  public rankTypeList: any;
  public rankType;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }


  ngOnInit() {
    this.userService.getRankType(this.userService.getCurrentUserId()).then(data => {
      this.rankTypeList = data.ranking_type_list.map((item) => {
        return {
          label: item.ranking_type_name,
          value: item.ranking_type_id
        }
      });
      console.log(this.rankTypeList);

    })
  }

  ngAfterViewInit() {

  }

  rankTypePicker() {
    const _modelThis = this;
    console.log(_modelThis.rankTypeList);

    weui.picker(_modelThis.rankTypeList, {
      onConfirm: function (result) {
        _modelThis.rankType = result[0];
      },
      id: 'rankTypePicker'
    });
  }

  dateEndPickerClick() {
    const _modelThis = this;
    weui.datePicker({
      defaultValue: [(new Date()).getFullYear(), (new Date()).getMonth() + 1, (new Date()).getDate()],
      onConfirm: function (result) {
        _modelThis.dateEndTime = result.map((item) => {
          return item.value<10?`0${item.value}`:item.value
        }).join('-');
      },
      id: 'dateEndPicker'
    });
  }

  dateStartPickerClick() {
    const _modelThis = this;
    weui.datePicker({
      defaultValue: [(new Date()).getFullYear(), (new Date()).getMonth() + 1, (new Date()).getDate()],
      onConfirm: function (result) {
        _modelThis.dateStartTime = result.map((item) => {
          return item.value<10?`0${item.value}`:item.value
        }).join('-');
      },
      id: 'dateStartPicker'
    });
  }

  public searchRank() {
    //[routerLink]="['/sum/search']"
    const query: any = {}
    if (this.dateStartTime != '开始时间') query.start = this.dateStartTime;
    if (this.dateEndTime != '结束时间') query.end = this.dateEndTime;
    if (this.rankType) query.rank_type=this.rankType.value;
    this.router.navigate(['/sum/search'], { queryParams: query });
  }

  public searchTotalRank() {
    this.router.navigate(['/sum/search']);
  }

  public searchCurrentMonthRank() {
    const start = moment().startOf('month').format('YYYY-MM-DD');
    const end = moment().format('YYYY-MM-DD');
    this.router.navigate(['/sum/search'], { queryParams: { start: start, end: end } });
  }

  public searchLastMonthRank() {
    const start = moment().add(-1, 'month').startOf('month').format('YYYY-MM-DD');
    const end = moment().add(-1, 'month').endOf('month').format('YYYY-MM-DD');
    this.router.navigate(['/sum/search'], { queryParams: { start: start, end: end } });
  }

}
