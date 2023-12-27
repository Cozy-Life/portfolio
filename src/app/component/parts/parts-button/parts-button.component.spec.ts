import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsButtonComponent } from './parts-button.component';

describe('PartsButtonComponent', () => {
  let component: PartsButtonComponent;
  let fixture: ComponentFixture<PartsButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartsButtonComponent]
    });
    fixture = TestBed.createComponent(PartsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
