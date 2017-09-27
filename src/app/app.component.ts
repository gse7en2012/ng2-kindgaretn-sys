import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit{

  public isGm:boolean=false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.isGm=this.userService.checkIsGm();
  }
  
}
