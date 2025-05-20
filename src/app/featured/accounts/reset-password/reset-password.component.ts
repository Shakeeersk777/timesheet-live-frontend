import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { IResetPasswordPayload } from '../accounts.modal';
import { Store } from '@ngrx/store';
import { ACCOUNTS_ACTION } from '../../../store/accounts/accounts.action';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
  store = inject(Store);
  resetPasswordForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  private _authService: AuthService = inject(AuthService);

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.resetPasswordForm = this.formBuilder.group({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  resetPassword(): void {
    if (this.resetPasswordForm.invalid) return;

    const payload = this.prepareRequest();
    this.store.dispatch(ACCOUNTS_ACTION.RESET_PASSWORD.LOAD({ payload }));
  }

  prepareRequest(): IResetPasswordPayload {
    const formData = this.resetPasswordForm.getRawValue();
    const currentUser = this._authService.getCurrentUser();

    const payload: IResetPasswordPayload = {
      employeeId: currentUser?.employeeId ?? '',
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    };

    return payload;
  }
}
