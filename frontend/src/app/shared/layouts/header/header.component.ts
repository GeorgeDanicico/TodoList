import { Component } from '@angular/core';
import { TokenService } from '../../../core/services/token.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbar, MatIcon, MatButton],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isAuthenticated$;
  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) {
    this.isAuthenticated$ = this.tokenService.isAuthentication;
  }

  onLogout() {
    this.authService.onLogout();
  }
}
