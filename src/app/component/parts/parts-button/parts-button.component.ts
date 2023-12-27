import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-parts-button',
  templateUrl: './parts-button.component.html',
  styleUrls: ['./parts-button.component.scss'],
})
export class PartsButtonComponent {
  @Input()
  text = '初期値を親コンポーネントで設定してください';

  @Input()
  value = '初期値を親コンポーネントで設定してください';

  @Input()
  className = 'main-button';

  @Output()
  clickedValue: EventEmitter<string> = new EventEmitter();

  constructor() {}

  onClick(value: string) {
    this.clickedValue.emit(value);
  }
}
