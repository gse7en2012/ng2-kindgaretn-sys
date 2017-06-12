import { Component, OnInit, AfterViewInit } from '@angular/core';
// import { PickerModule } from 'ngx-weui/picker';

declare var weui: any;



@Component({
  selector: 'app-sum-page',
  templateUrl: './sum-page.component.html',
  styleUrls: ['./sum-page.component.css']
})
export class SumPageComponent implements OnInit, AfterViewInit {
  public dateStartTime: string='开始时间';
  public dateEndTime: string='结束时间';
  constructor() { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {

  }

  dateEndPickerClick() {
    const _modelThis=this;
    weui.datePicker({
      defaultValue: [(new Date()).getFullYear(), (new Date()).getMonth()+1, (new Date()).getDate()],
      onConfirm: function (result) {
        _modelThis.dateEndTime=result.map((item)=>{
          return item.value
        }).join('-');
      },
      id: 'dateEndPicker'
    });
  }

  dateStartPickerClick() {
    const _modelThis=this;
    weui.datePicker({
      defaultValue: [(new Date()).getFullYear(), (new Date()).getMonth()+1, (new Date()).getDate()],
      onConfirm: function (result) {
        _modelThis.dateStartTime=result.map((item)=>{
          return item.value
        }).join('-');
      },
      id: 'dateStartPicker'
    });
  }

}
