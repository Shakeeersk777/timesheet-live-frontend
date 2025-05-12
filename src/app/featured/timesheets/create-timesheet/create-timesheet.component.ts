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
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';
import {
  IApiResponce,
  IDropdownResponse,
  IProjectAssignedDropdownResponse,
} from '../../../core/models/models.interfece';
import { LayoutService } from '../../layout/layout.service';
import { ITimeSheetEntryPayload } from '../timesheet.modal';
import { TimesheetService } from '../timesheet.service';
import { AuthService } from '../../../core/services/auth.service';

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
  formBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  dropdownData: IDropdownResponse | undefined;
  projectAssignedDropdown: IProjectAssignedDropdownResponse | undefined;
  private _layoutService: LayoutService = inject(LayoutService);
  private _timesheetService: TimesheetService = inject(TimesheetService);
  private _authService: AuthService = inject(AuthService);

  ngOnInit(): void {
    this.initForm();
    this.getDropdownData();

    this.createTimesheetForm.controls['projectId'].valueChanges.subscribe(
      (id: string) => {
        if (id) this.getProjectAssignedDropdown(id);
      }
    );
  }

  initForm() {
    this.createTimesheetForm = this.formBuilder.group({
      projectId: new FormControl(null, Validators.required),
      taskId: new FormControl(null, Validators.required),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      hours: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    });
  }

  getDropdownData(): void {
    const observer = {
      next: (res: IApiResponce) => {
        if (!res) return;

        this.dropdownData = res._data;

        if (!res._status) {
          this._layoutService.openSnackBar(res._msg, res._status);
          return;
        }
      },
      error: (err: any) => this._layoutService.onError(err),
    };

    this._layoutService.getDropdownData().subscribe(observer);
  }

  getProjectAssignedDropdown(projectId: string): void {
    const observer = {
      next: (res: IApiResponce) => {
        if (!res) return;

        this.projectAssignedDropdown = res._data;

        if (!res._status) {
          this._layoutService.openSnackBar(res._msg, res._status);
          return;
        }
      },
      error: (err: any) => this._layoutService.onError(err),
    };

    this._layoutService
      .getProjectAssignedDropdown(projectId)
      .subscribe(observer);
  }

  navigateToList(): void {
    this.router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.TIMESHEET.BASE}/${ROUTE_NAMES.TIMESHEET.LIST}`
    );
  }

  submitForm(): void {
    // if (this.createTimesheetForm.invalid) return;

    const observer = {
      next: (res: IApiResponce) => {
        this._layoutService.openSnackBar(res._msg, res._status);
        if (res._status) this.navigateToList();
      },
      error: (err: any) => this._layoutService.onError(err),
    };

    const payload = this.prepareRequest();
    this._timesheetService.addTimesheet(payload).subscribe(observer);
  }

  prepareRequest(): ITimeSheetEntryPayload {
    const formData = this.createTimesheetForm.getRawValue();
    const userId = this._authService.getCurrentUser()?.employeeId ?? '';

    return {
      EmployeeId: userId,
      TaskId: formData.taskId,
      ProjectId: formData.projectId,
      StartDate: formData.startDate,
      EndDate: formData.endDate,
      Hours: formData.hours,
      Description: formData.description,
    };
  }
}
