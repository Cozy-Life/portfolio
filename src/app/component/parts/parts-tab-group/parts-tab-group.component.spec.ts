import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsTabGroupComponent } from './parts-tab-group.component';

describe('PartsTabGroupComponent', () => {
  let component: PartsTabGroupComponent;
  let fixture: ComponentFixture<PartsTabGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartsTabGroupComponent]
    });
    fixture = TestBed.createComponent(PartsTabGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
