import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACKBAR_RESPONSE_TYPE } from '../../core/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, status: boolean) {
    this._snackBar.open(message, 'close', {
      duration: 2000, // milliseconds
      horizontalPosition: 'right', // or 'left', 'center'
      verticalPosition: 'top', // or 'bottom'
      panelClass: [status ? SNACKBAR_RESPONSE_TYPE.SUCCESS : SNACKBAR_RESPONSE_TYPE.ERROR ],
    });
  }
}
