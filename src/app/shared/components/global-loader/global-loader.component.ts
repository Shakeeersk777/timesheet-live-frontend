import { Component, inject, OnInit } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NGX_LOADER_TYPE } from '../../../core/constants/constants';

@Component({
  selector: 'app-global-loader',
  standalone: true,
  imports: [NgxSpinnerModule],
  templateUrl: './global-loader.component.html',
  styleUrl: './global-loader.component.scss',
})
export class GlobalLoaderComponent {
  loaderType = NGX_LOADER_TYPE;
}
