import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';
import { Store } from '@ngrx/store';
import { ACCOUNTS_ACTION } from '../../../store/accounts/accounts.action';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent implements OnInit {
  store = inject(Store);
  forgotPasswordForm!: FormGroup;
  showLoader: boolean = false;

  private _router: Router = inject(Router);
  private _formBuilder: FormBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.forgotPasswordForm = this._formBuilder.group({
      employeeId: new FormControl('', [Validators.required]),
    });
  }

  resetPassword(): void {
    if (this.forgotPasswordForm.invalid) return;
    const formData = this.forgotPasswordForm.getRawValue();
    const payload = { employeeId: formData?.employeeId };

    this.store.dispatch(
      ACCOUNTS_ACTION.FORGOT_PASSWORD.LOAD({
        payload,
      })
    );
  }

  navigateToLogin() {
    this._router.navigateByUrl(ROUTE_NAMES.AUTH.BASE);
  }
}
