import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';
import { AuthService } from '../../../core/services/auth.service';
import { LayoutService } from '../../layout/layout.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AccountsService } from '../accounts.service';
import { IApiResponce } from '../../../core/models/models.interfece';
import { GlobalLoaderComponent } from '../../../shared/components/global-loader/global-loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, GlobalLoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showLoader: boolean = false;

  private _router: Router = inject(Router);
  private _authService: AuthService = inject(AuthService);
  private _layoutService: LayoutService = inject(LayoutService);
  private _accountsService: AccountsService = inject(AccountsService);
  private _formBuilder: FormBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.initForm();
    this._layoutService.isShowGlobalLoader.subscribe((show) => {
      this.showLoader = show;
    });
  }

  initForm() {
    this.loginForm = this._formBuilder.group({
      employeeId: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onLogin(): void {
    this._layoutService.showGlobalLoader();
    const onSuccess = (res: IApiResponce): void => {
      if (!res) return;

      this._layoutService.openSnackBar(res._msg, res._status);

      if (res._status) {
        this._authService.setCurrentUser(res._data);
        this._router.navigateByUrl(ROUTE_NAMES.APP);
      }
      this._layoutService.hideGlobalLoader();
    };

    const onError = (error: any): void => {
      this._layoutService.hideGlobalLoader();
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
