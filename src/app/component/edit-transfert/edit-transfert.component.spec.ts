import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTransfertComponent } from './edit-transfert.component';

describe('EditTransfertComponent', () => {
  let component: EditTransfertComponent;
  let fixture: ComponentFixture<EditTransfertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTransfertComponent]
    });
    fixture = TestBed.createComponent(EditTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
