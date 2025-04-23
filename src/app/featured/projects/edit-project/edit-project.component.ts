import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.scss',
})
export class EditProjectComponent {
  editProjectForm!: FormGroup;
  _formBuilder = inject(FormBuilder);
  _router: Router = inject(Router);

  onSubmit() {}

  onBack() {
    this._router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.PROJECT.BASE}/${ROUTE_NAMES.PROJECT.LIST}`
    );
  }
}
