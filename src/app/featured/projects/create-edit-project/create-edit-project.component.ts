import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-edit-project',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './create-edit-project.component.html',
  styleUrl: './create-edit-project.component.scss',
})
export class CreateEditProjectComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private _dialogRef = inject(MatDialogRef<CreateEditProjectComponent>);
  private _data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {}
  
  onCancel(): void {
    this._dialogRef.close({ success: false });
  }

  onSubmit(): void {
    this._dialogRef.close({ success: true });
  }
}
