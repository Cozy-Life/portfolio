import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsCheckBoxComponent } from './parts-check-box.component';

describe('PartsCheckBoxComponent', () => {
  let component: PartsCheckBoxComponent;
  let fixture: ComponentFixture<PartsCheckBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartsCheckBoxComponent]
    });
    fixture = TestBed.createComponent(PartsCheckBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
