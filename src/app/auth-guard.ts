import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './service/user.service';

@Injectable()
export class AuthGuard implements CanActivate {


    constructor(private router: Router, private userService: UserService) { }
    canActivate() {
        if (this.userService.checkIsLogin()) {
            // logged in so return true
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}

@Injectable()
export class GmAuthGuard implements CanActivate {
    constructor(private router: Router, private userService: UserService) { }

    canActivate() {
        if (this.userService.checkIsLogin() && this.userService.checkIsGm()) {
            return true;
        }
        this.router.navigate(['/home']);
        return false;
    }
}
