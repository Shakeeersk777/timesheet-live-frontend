import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-popup',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './confirm-popup.component.html',
  styleUrl: './confirm-popup.component.scss'
})
export class ConfirmPopupComponent {
  private _dialogRef = inject(MatDialogRef<ConfirmPopupComponent>);

  cancel(): void {
    this._dialogRef.close({ confirm: false });
  }
  
  confirm(): void {
    this._dialogRef.close({ confirm: true });
  }
}
