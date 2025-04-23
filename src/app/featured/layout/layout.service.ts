import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACKBAR_RESPONSE_TYPE } from '../../core/constants/constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  tableLoaderState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  private _snackBar = inject(MatSnackBar);

  showTableLoaderState() {
    this.tableLoaderState.next(true);
  }

  stopTableLoaderState() {
    this.tableLoaderState.next(false);
  }

  openSnackBar(message: string, status: boolean) {
    this._snackBar.open(message, 'close', {
      duration: 2000, // milliseconds
      horizontalPosition: 'right', // or 'left', 'center'
      verticalPosition: 'top', // or 'bottom'
      panelClass: [
        status ? SNACKBAR_RESPONSE_TYPE.SUCCESS : SNACKBAR_RESPONSE_TYPE.ERROR,
      ],
    });
  }
}
