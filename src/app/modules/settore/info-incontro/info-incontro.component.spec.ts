import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoIncontroComponent } from './info-incontro.component';

describe('InfoIncontroComponent', () => {
  let component: InfoIncontroComponent;
  let fixture: ComponentFixture<InfoIncontroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoIncontroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoIncontroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
