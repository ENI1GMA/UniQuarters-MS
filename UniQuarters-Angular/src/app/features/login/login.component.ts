import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/models/loginUser';
import { Role } from 'src/app/models/role';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMsgs: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.logout();
    this.loginForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
      },
      { updateOn: 'submit' }
    );
  }

  login() {
    this.errorMsgs = [];
    if (this.loginForm.invalid) {
      this.showValidationMsgs();
    } else {
      let loginUser: LoginUser;
      loginUser = { ...this.loginForm.value };
      this.authService.login(loginUser).subscribe({
        next: (response) => {
          this.tokenService.setAccessToken(response.access_token);
          this.tokenService.setRefreshToken(response.refresh_token);
          this.authService.getLoggedInUser().subscribe((response) => {
            sessionStorage.setItem('userId', response.sub);
            sessionStorage.setItem('username', response.preferred_username);
          });
          // this.authService.setRole(response.role);
          // if(response.role == Role.Admin)
          this.router.navigate(['/gestion/dashboard']);
          // if(response.role == Role.Etudiant)
          // this.router.navigate(["/loggedIn/home"]);
        },
        error: (error) => {
          this.errorMsgs.push({
            severity: 'error',
            detail: 'Username ou mot de passe incorrecte',
          });
        },
      });
    }
  }

  showValidationMsgs() {
    if (this.loginForm.controls['username'].hasError('required')) {
      this.errorMsgs.push({
        severity: 'error',
        detail: 'Veuillez saisir votre identifiant.',
      });
    }
    if (this.loginForm.controls['password'].hasError('required')) {
      this.errorMsgs.push({
        severity: 'error',
        detail: 'Veuillez saisir votre mot de passe.',
      });
    }
  }
}
