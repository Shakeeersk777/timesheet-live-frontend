import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';

@Component({
  selector: 'app-create-edit-project',
  standalone: true,
  imports: [],
  templateUrl: './create-edit-project.component.html',
  styleUrl: './create-edit-project.component.scss',
})
export class CreateEditProjectComponent {
  _formBuilder = inject(FormBuilder);
  _router: Router = inject(Router);

  onSubmit() {}

  onBack() {
    this._router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.PROJECT.BASE}/${ROUTE_NAMES.PROJECT.LIST}`
    );
  }
}
