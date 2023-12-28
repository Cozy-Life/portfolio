import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-parts-check-box',
  templateUrl: './parts-check-box.component.html',
  styleUrls: ['./parts-check-box.component.scss'],
})
export class PartsCheckBoxComponent {
  @Input()
  id: number;

  @Input()
  isChecked: boolean;

  @Input()
  checkedMap: any;

  @Output()
  changeEvent: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.id = 0;
    this.isChecked = false;
  }

  onChange(e: any, id: number) {
    this.checkedMap.set(id, e.currentTarget.checked);
    this.changeEvent.emit();
  }
}
