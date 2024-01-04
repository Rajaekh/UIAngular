import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBeneficiaireComponent } from './add-beneficiaire.component';

describe('AddBeneficiaireComponent', () => {
  let component: AddBeneficiaireComponent;
  let fixture: ComponentFixture<AddBeneficiaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBeneficiaireComponent]
    });
    fixture = TestBed.createComponent(AddBeneficiaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
