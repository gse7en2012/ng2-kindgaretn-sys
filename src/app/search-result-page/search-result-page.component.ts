import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';

@Component({
  selector: 'app-search-result-page',
  templateUrl: './search-result-page.component.html',
  styleUrls: ['./search-result-page.component.css'],
  animations: [routerTransition()],
  host: { '[@routerTransition]': '' }
})
export class SearchResultPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
