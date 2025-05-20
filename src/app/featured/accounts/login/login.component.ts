import { Component, inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalLoaderComponent } from '../../../shared/components/global-loader/global-loader.component';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';
import { LayoutService } from '../../layout/layout.service';
import { Store } from '@ngrx/store';
import { ACCOUNTS_ACTION } from '../../../store/accounts/accounts.action';
import { selectAccountsLoading } from '../../../store/accounts/accounts.selector';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, GlobalLoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  store = inject(Store);
  loading$ = this.store.select(selectAccountsLoading);
  loginForm!: FormGroup;
  showLoader: boolean = false;

  private _router: Router = inject(Router);
  private _layoutService: LayoutService = inject(LayoutService);
  private _formBuilder: FormBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.initForm();

    this.loading$.subscribe((state) =>
      this._layoutService.updateGlobalLoader(state)
    );
  }

  initForm() {
    this.loginForm = this._formBuilder.group({
      employeeId: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onLogin(): void {
    const payload = this.loginForm.getRawValue();
    this.store.dispatch(ACCOUNTS_ACTION.LOGIN.LOAD({ payload }));
  }

  forgotPassword() {
    this._router.navigateByUrl(
      `${ROUTE_NAMES.AUTH.BASE}/${ROUTE_NAMES.AUTH.FORGOT_PASSWORD}`
    );
  }
}
