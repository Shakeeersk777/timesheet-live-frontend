import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';
import { AuthService } from '../../../core/services/auth.service';
import { LayoutService } from '../../layout/layout.service';
import { SNACKBAR_RESPONSE_TYPE } from '../../../core/constants/constants';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AccountsService } from '../accounts.service';
import { IApiResponce } from '../../../core/models/models.interfece';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  private _router: Router = inject(Router);
  private _authService: AuthService = inject(AuthService);
  private _layoutService: LayoutService = inject(LayoutService);
  private _accountsService: AccountsService = inject(AccountsService);
  private _formBuilder: FormBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this._formBuilder.group({
      employeeId: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onLogin(): void {
    const onSuccess = (res: IApiResponce): void => {
      if (!res) return;

      this._layoutService.openSnackBar(res._msg, res._status);

      if (res._status) {
        this._authService.setCurrentUser(res._data);
        this._router.navigateByUrl(ROUTE_NAMES.APP);
      }
      console.log('Login successful:', res);
    };

    const onError = (error: any): void => {
      // Handle error (e.g., show error message)
      console.error('Login error:', error);
    };

    const observer = {
      next: onSuccess,
      error: onError,
    };

    this._accountsService
      .login(this.loginForm.getRawValue())
      .subscribe(observer);
  }
}
