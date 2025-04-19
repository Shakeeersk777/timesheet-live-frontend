import { Component, inject, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SelectDropdownComponent } from '../../../shared/components/select-dropdown/select-dropdown.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-create-timesheet',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    SelectDropdownComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-timesheet.component.html',
  styleUrl: './create-timesheet.component.scss',
})
export class CreateTimesheetComponent implements OnInit {
  createTimesheetForm!: FormGroup;
  _formBuilder = inject(FormBuilder);
  projects = [
    { id: 'projectA', name: 'Project A' },
    { id: 'projectB', name: 'Project B' },
    { id: 'projectB', name: 'Project B' },
    { id: 'projectB', name: 'Project B' },
    { id: 'projectB', name: 'Project B' },
    { id: 'projectB', name: 'Project B' },
  ];

  ngOnInit(): void {
    this.createTimesheetForm = new FormGroup({
      project: new FormControl(null),
      taskType: new FormControl(null),
      task: new FormControl(null),
      date: new FormControl(null),
      hours: new FormControl(null),
      description: new FormControl(null),
    });
  }

  onSubmit() {
    console.log(this.createTimesheetForm);
  }
}
