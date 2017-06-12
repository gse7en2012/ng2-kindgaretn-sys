import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { WeUiModule } from 'ngx-weui';
// import { DatepickerModule } from 'angular2-material-datepicker'


import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SumPageComponent } from './sum-page/sum-page.component';
import { MePageComponent } from './me-page/me-page.component';
import { DepartmentPageComponent } from './department-page/department-page.component';
import { SearchResultPageComponent } from './search-result-page/search-result-page.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'sum', component: SumPageComponent },
  { path: 'me', component: MePageComponent },
  { path: 'me/department', component: DepartmentPageComponent },
  { path: 'sum/search', component: SearchResultPageComponent },

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
    SearchResultPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    // DatepickerModule,
    RouterModule.forRoot(appRoutes),
    // WeUiModule.forRoot()
  ],
  providers: [{ provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
