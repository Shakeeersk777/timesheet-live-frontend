import { Component, inject } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { GlobalLoaderComponent } from '../../shared/components/global-loader/global-loader.component';
import { LayoutService } from './layout.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet, HeaderComponent, GlobalLoaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  showLoader: boolean = false;
  private _layoutService: LayoutService = inject(LayoutService);

  ngOnInit(): void {
    this._layoutService.isShowGlobalLoader.subscribe((show) => {
      this.showLoader = show;
    });
  }
}
