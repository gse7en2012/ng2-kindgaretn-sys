import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {

    private loginRedirectUrl='';

    constructor(private router: Router) { }

    canActivate() {
       
       
        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}
