import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettoreCardComponent } from './settore-card.component';

describe('SettoreCardComponent', () => {
  let component: SettoreCardComponent;
  let fixture: ComponentFixture<SettoreCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettoreCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettoreCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
