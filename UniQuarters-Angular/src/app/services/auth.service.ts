import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from '../models/loginUser';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { TokenService } from './token.service';

const tokenUrl = "http://keycloakauth:8080/realms/Enigma/protocol/openid-connect/";


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private http: HttpClient, 
        private router: Router,
        private tokenService: TokenService,
        ) {}

    // getRole() {
    //     return sessionStorage.getItem("ROLE");
    // }
    // setRole(role:Role){
    //     sessionStorage.setItem("ROLE",role);
    // }

    getLoggedInUser():Observable<any>{
        // id property is sub : string
        return this.http.get(tokenUrl+"/userinfo");
    }

    // getLoggedInEtudiant():Observable<any>{
    //     return this.http.get(keycloakUrl+"/etudiantByToken/"+this.tokenService.getAccessToken());
    // }

    login(u: LoginUser): Observable<any> {
        let body = new URLSearchParams();
        body.set("client_id","enigma-rest-api");
        body.set("username",u.username);
        body.set("password",u.password);
        body.set("grant-type","password");
        body.set("scope","openid profile email");
        let headers = new HttpHeaders({
            'Content-Type':'application/x-www-form-urlencoded'
        });
        let options = {headers: headers};
        return this.http.post(tokenUrl+"/token",body,options);
    }

    logout() {
        this.tokenService.removeToken();
        // return this.http.post(tokenUrl);
    }

    refreshToken(refreshToken:string):Observable<any>{
        let body = new URLSearchParams();
        body.set("client_id","enigma-rest-api");
        body.set("grant-type","refresh_token");
        body.set("refresh_token",refreshToken); 
        let headers = new HttpHeaders({
            'Content-Type':'application/x-www-form-urlencoded'
        });
        let options = {headers: headers};
        return this.http.post(tokenUrl+"/token",body,options);
    }
  
    // register(e:Etudiant): Observable<any> {
    //     return this.http.post(keycloakUrl+"/register",e, { observe: 'response' }).pipe(retry(3), catchError(this.handleError));
    // }

    // emailExists(email:string){
    //     return this.http.get(keycloakUrl+"/emailAlreadyExists/"+email,{responseType:'text'}).pipe(retry(3), catchError(this.handleError));
    // }


    handleError(error: HttpErrorResponse) {
        let errorMessage = 'Unknown error!';
        errorMessage =
          error.error instanceof ErrorEvent
            ? `Error: ${error.error.message}`
            : `\nCode: ${error.status}\nMessage: ${error.message}`;
        return throwError(() => new Error(errorMessage));
      }

}
