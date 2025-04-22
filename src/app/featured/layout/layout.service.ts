import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, type: string) {
    this._snackBar.open(message, 'close', {
      duration: 3000, // milliseconds
      horizontalPosition: 'right', // or 'left', 'center'
      verticalPosition: 'top', // or 'bottom'
    });
  }
}
