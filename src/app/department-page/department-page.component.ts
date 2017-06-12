import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';

@Component({
  selector: 'app-department-page',
  templateUrl: './department-page.component.html',
  styleUrls: ['./department-page.component.css'],
  animations: [routerTransition()],
  host: { '[@routerTransition]': '' }
})
export class DepartmentPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
