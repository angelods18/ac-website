import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaNuovoComponent } from './crea-nuovo.component';

describe('CreaNuovoComponent', () => {
  let component: CreaNuovoComponent;
  let fixture: ComponentFixture<CreaNuovoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreaNuovoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaNuovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
