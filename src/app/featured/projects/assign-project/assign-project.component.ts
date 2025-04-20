import { Component, inject, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';
import { SelectDropdownComponent } from '../../../shared/components/select-dropdown/select-dropdown.component';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
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
    MatChipsModule,
    MatIconModule,
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
    { id: 'projectB', name: 'Project B' },
    { id: 'projectB', name: 'Project B' },
    { id: 'projectB', name: 'Project B' },
    { id: 'projectB', name: 'Project B' },
    { id: 'projectB', name: 'Project B' },
  ];

  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly fruits = signal<Fruit[]>([]);
  readonly announcer = inject(LiveAnnouncer);
  private _dialogRef = inject(MatDialogRef<AssignProjectComponent>);
  private _data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {}

  onCancel(): void {
    this._dialogRef.close({ success: false });
  }

  onSubmit(): void {
    this._dialogRef.close({ success: true });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.update((fruits) => [...fruits, { name: value }]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    this.fruits.update((fruits) => {
      const index = fruits.indexOf(fruit);
      if (index < 0) {
        return fruits;
      }

      fruits.splice(index, 1);
      this.announcer.announce(`Removed ${fruit.name}`);
      return [...fruits];
    });
  }

  edit(fruit: Fruit, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    this.fruits.update((fruits) => {
      const index = fruits.indexOf(fruit);
      if (index >= 0) {
        fruits[index].name = value;
        return [...fruits];
      }
      return fruits;
    });
  }
}
