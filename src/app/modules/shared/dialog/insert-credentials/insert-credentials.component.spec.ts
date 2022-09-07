import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertCredentialsComponent } from './insert-credentials.component';

describe('InsertCredentialsComponent', () => {
  let component: InsertCredentialsComponent;
  let fixture: ComponentFixture<InsertCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertCredentialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
