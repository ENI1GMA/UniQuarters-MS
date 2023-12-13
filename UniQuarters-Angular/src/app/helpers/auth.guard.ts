import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard {
    constructor(private tokenService: TokenService, private router: Router) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(!this.tokenService.getAccessToken() ){
            this.router.navigate(['/login']);
            return false;
        }
        else return true;
    }

}