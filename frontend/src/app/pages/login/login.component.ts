import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { AuthService } from '../../core/services/auth.service';
import {MatIconModule} from "@angular/material/icon";
import {Router, RouterLink} from "@angular/router";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {SNACK_BAR} from "../../core/constants/constants";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    console.log("submit");
    if (this.loginForm.valid) {
      this.authService.onLogin(this.loginForm.value).subscribe({
        next: () => {
          this.snackBar.open(
              'Logged in successfully',
              SNACK_BAR.action,
              {
                verticalPosition: SNACK_BAR.verticalPosition as MatSnackBarVerticalPosition,
                horizontalPosition: SNACK_BAR.horizontalPosition as MatSnackBarHorizontalPosition, duration: SNACK_BAR.duration}
            );
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.log(error);
          this.snackBar.open(
            'Invalid credentials.',
            SNACK_BAR.action,
            {
              verticalPosition: SNACK_BAR.verticalPosition as MatSnackBarVerticalPosition,
              horizontalPosition: SNACK_BAR.horizontalPosition as MatSnackBarHorizontalPosition, duration: SNACK_BAR.duration}
          );
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
