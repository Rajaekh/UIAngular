import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTransfertStatusComponent } from './edit-transfert-status.component';

describe('EditTransfertStatusComponent', () => {
  let component: EditTransfertStatusComponent;
  let fixture: ComponentFixture<EditTransfertStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTransfertStatusComponent]
    });
    fixture = TestBed.createComponent(EditTransfertStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
