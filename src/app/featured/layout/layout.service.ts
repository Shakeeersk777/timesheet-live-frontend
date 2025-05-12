import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACKBAR_RESPONSE_TYPE } from '../../core/constants/constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  tableLoaderState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  private _snackBar = inject(MatSnackBar);
  private _spinnerService: NgxSpinnerService = inject(NgxSpinnerService);
  private _apiService: ApiService = inject(ApiService);
  isShowGlobalLoader = new BehaviorSubject<boolean>(false);

  showGlobalLoader() {
    console.log('showGlobalLoader called');
    this.isShowGlobalLoader.next(true);
    this._spinnerService.show();
  }

  hideGlobalLoader() {
    this.isShowGlobalLoader.next(false);
    this._spinnerService.hide();
  }

  getDropdownData(): Observable<any> {
    return this._apiService.getService('/get/dropdown');
  }

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

  onError(error: any): void {
    this.stopTableLoaderState();
  }

  getProjectAssignedDropdown(projectId: string): Observable<any> {
    return this._apiService.getService(`/projects/assigned-employees/dropdown/${projectId}`);
  }
}
