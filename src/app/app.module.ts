import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieModule } from 'ngx-cookie';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ExtendedHttpService } from './service/extended-http.service';
// import { WeUiModule } from 'ngx-weui';
// import { DatepickerModule } from 'angular2-material-datepicker'


import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SumPageComponent } from './sum-page/sum-page.component';
import { MePageComponent } from './me-page/me-page.component';
import { DepartmentPageComponent } from './department-page/department-page.component';
import { SearchResultPageComponent } from './search-result-page/search-result-page.component';
import { LoginComponent } from './login/login.component';
import { GrowthComponent } from './me-page/growth/growth.component';
import { TimelineComponent } from './me-page/timeline/timeline.component';
import { OtherPageComponent } from './other-page/other-page.component';
import { SendPointComponent } from './send-point/send-point.component';

import { AuthGuard,GmAuthGuard } from './auth-guard';
import { UserService } from './service/user.service';
import { EmployeeComponent } from './department-page/employee/employee.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomePageComponent,canActivate: [AuthGuard] },
  { path: 'sum', component: SumPageComponent,canActivate: [AuthGuard] },
  { path: 'me', component: MePageComponent,canActivate: [AuthGuard] },
  { path: 'me/department', component: DepartmentPageComponent,canActivate: [AuthGuard] },
  { path: 'me/department/employee_list', component: EmployeeComponent,canActivate: [AuthGuard] },
  { path: 'me/growth/:type/:eid', component: GrowthComponent,canActivate: [AuthGuard] },
  { path: 'me/timeline', component: TimelineComponent,canActivate: [AuthGuard] },
  { path: 'home/personal/:uid',component:OtherPageComponent,canActivate: [AuthGuard]},
  { path: 'sum/search', component: SearchResultPageComponent,canActivate: [AuthGuard] },
  { path: 'send_point', component: SendPointComponent,canActivate: [GmAuthGuard] },

]


export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'swipe': { velocity: 0.4, threshold: 20 } // override default settings
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SumPageComponent,
    MePageComponent,
    DepartmentPageComponent,
    SearchResultPageComponent,
    LoginComponent,
    GrowthComponent,
    TimelineComponent,
    OtherPageComponent,
    SendPointComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    InfiniteScrollModule,
    // DatepickerModule,
    CookieModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    // WeUiModule.forRoot()
  ],
  providers: [AuthGuard,GmAuthGuard,UserService,{ provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig }, { provide: Http, useClass: ExtendedHttpService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
