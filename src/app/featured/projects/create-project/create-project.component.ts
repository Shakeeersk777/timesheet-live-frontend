import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IApiResponce } from '../../../core/models/models.interfece';
import { LayoutService } from '../../layout/layout.service';
import { ICreateProject } from '../project.modal';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss'
})
export class CreateProjectComponent {
  private formBuilder = inject(FormBuilder);
  private _dialogRef = inject(MatDialogRef<CreateProjectComponent>);
  private _projectService: ProjectService = inject(ProjectService);
  private _layoutService: LayoutService = inject(LayoutService);
  createEProjectForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.createEProjectForm = this.formBuilder.group({
      projectName: new FormControl('', [Validators.required]),
      allocateHours: new FormControl('', [Validators.required]),
    });
  }

  onCancel(): void {
    this._dialogRef.close({ success: false });
  }

  onCompleted(): void {
    this._dialogRef.close({ success: true });
  }

  submitForm(): void {
    if (this.createEProjectForm.invalid) return;

    const payload = this.prepareRequest();
    const observer = {
      next: (res: IApiResponce) => {
        this._layoutService.openSnackBar(res._msg, res._status);
        if (res._status) this.onCompleted();
      },
      error: (err: any) => {},
    };

    this._projectService.addProject(payload).subscribe(observer);
  }

  prepareRequest() {
    const formData = this.createEProjectForm.getRawValue();
    const responseBody: ICreateProject = {
      ProjectName: formData.projectName,
      TotalAllocatedHours: formData.allocateHours,
    };

    return responseBody;
  }
}
