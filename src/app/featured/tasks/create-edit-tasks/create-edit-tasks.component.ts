import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';
import { SelectDropdownComponent } from '../../../shared/components/select-dropdown/select-dropdown.component';

@Component({
  selector: 'app-create-edit-tasks',
  standalone: true,
  imports: [SelectDropdownComponent],
  templateUrl: './create-edit-tasks.component.html',
  styleUrl: './create-edit-tasks.component.scss'
})
export class CreateEditTasksComponent {
  _formBuilder = inject(FormBuilder);
  _router: Router = inject(Router);

  projects = [
    { id: 'projectA', name: 'Project A' },
    { id: 'projectB', name: 'Project B' },
    { id: 'projectB', name: 'Project B' },
    { id: 'projectB', name: 'Project B' },
    { id: 'projectB', name: 'Project B' },
    { id: 'projectB', name: 'Project B' },
  ];
  
  onSubmit() {}

  onBack() {
    this._router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.TASK.BASE}/${ROUTE_NAMES.TASK.LIST}`
    );
  }
}
