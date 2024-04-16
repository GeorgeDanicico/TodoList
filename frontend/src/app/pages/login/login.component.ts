import {Component, signal} from '@angular/core';
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
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, RouterLink, MatProgressSpinner],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  isLoading = signal(false);

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
    if (this.loginForm.valid) {
      this.isLoading.set(true)
      this.authService.onLogin(this.loginForm.value).subscribe({
        next: () => {
          this.snackBar.open(
              'Logged in successfully',
              SNACK_BAR.action,
              {
                verticalPosition: SNACK_BAR.verticalPosition as MatSnackBarVerticalPosition,
                horizontalPosition: SNACK_BAR.horizontalPosition as MatSnackBarHorizontalPosition, duration: SNACK_BAR.duration}
            );
          this.isLoading.set(false);
          this.router.navigate(['/dashboard']);
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
          this.isLoading.set(false);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
