import {Component, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../core/services/auth.service";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {SNACK_BAR} from "../../core/constants/constants";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatProgressSpinner,
    RouterLink,
    MatError
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  isLoading = signal(false);

    constructor(
        private fb: FormBuilder, private authService: AuthService,
        private snackBar: MatSnackBar, private router: Router
    ) {
      this.registerForm = this.fb.group({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
      });
    }

    onSubmit() {
      if (this.registerForm.valid) {
        this.isLoading.set(true);
        this.authService.onRegister(this.registerForm.value).subscribe({
          next: (response) => {
            this.snackBar.open(
                'User registered successfully',
                SNACK_BAR.action,
                {
                  verticalPosition: SNACK_BAR.verticalPosition as MatSnackBarVerticalPosition,
                  horizontalPosition: SNACK_BAR.horizontalPosition as MatSnackBarHorizontalPosition, duration: SNACK_BAR.duration}
            );
            this.router.navigate(['/login']);

            },
          error: (error) => {
            console.log(error);
            this.snackBar.open(
                'An error occurred.',
                SNACK_BAR.action,
                {
                  verticalPosition: SNACK_BAR.verticalPosition as MatSnackBarVerticalPosition,
                  horizontalPosition: SNACK_BAR.horizontalPosition as MatSnackBarHorizontalPosition, duration: SNACK_BAR.duration}
            );
            this.isLoading.set(false);
          },
          complete: () => {
            this.isLoading.set(false);
          }

        });
      } else {
        this.registerForm.markAllAsTouched();
      }
    }


}
