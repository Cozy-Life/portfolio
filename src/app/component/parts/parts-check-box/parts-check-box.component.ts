import { Component, Input } from '@angular/core';

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

  constructor() {
    this.id = 0;
    this.isChecked = false;
  }
}
