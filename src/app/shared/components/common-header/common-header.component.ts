import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IHeaderButton } from '../../../core/models/models.interfece';

@Component({
  selector: 'app-common-header',
  standalone: true,
  imports: [],
  templateUrl: './common-header.component.html',
  styleUrl: './common-header.component.scss',
})
export class CommonHeaderComponent {
  @Input() title = '';
  @Input() buttons: IHeaderButton[] = [];
  @Output() actionTriggered = new EventEmitter<string>();

  onAction(action: string) {
    this.actionTriggered.emit(action);
  }
}
