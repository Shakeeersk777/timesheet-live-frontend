import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectDropdownComponent } from '../../../shared/components/select-dropdown/select-dropdown.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
interface Fruit {
  name: string;
}

@Component({
  selector: 'app-assign-project',
  standalone: true,
  imports: [
    SelectDropdownComponent,
    MatFormFieldModule,
    MatDialogModule
  ],
  templateUrl: './assign-project.component.html',
  styleUrl: './assign-project.component.scss',
})
export class AssignProjectComponent {
  _formBuilder = inject(FormBuilder);
  _router: Router = inject(Router);
  projects = [
    { id: 'projectA', name: 'Project A' },
    { id: 'projectB', name: 'Project B' },
  ];

  private _dialogRef = inject(MatDialogRef<AssignProjectComponent>);
  private _data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {}

  onCancel(): void {
    this._dialogRef.close({ success: false });
  }

  onSubmit(): void {
    this._dialogRef.close({ success: true });
  }
}
