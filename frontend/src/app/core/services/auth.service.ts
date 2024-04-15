import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ILogin, ILoginResponse, IRegister} from '../models/auth.model';
import { apiEndpoint } from '../constants/constants';
import { map } from 'rxjs';
import { TokenService } from './token.service';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router) {}

  onLogin(data: ILogin) {
    return this.http
      .post<ILoginResponse>(`${apiEndpoint.AuthEndpoint.login}`, data)
      .pipe(
        map((response) => {
          if (response) {
            this.tokenService.setToken(response.token);
            localStorage.setItem('userId', response.user.id.toString());
          }
          return response;
        })
      );
  }

    onRegister(data: IRegister) {
        return this.http
        .post<ILoginResponse>(`${apiEndpoint.AuthEndpoint.register}`, data);
    }

  onLogout() {
    this.http.post(`${apiEndpoint.AuthEndpoint.logout}`, '').subscribe({
      next: (response) => {
        this.tokenService.removeToken();
        localStorage.removeItem('userId');
        this.router.navigate(['/login']);
      },
    });
  }
}
