import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendPointComponent } from './send-point.component';

describe('SendPointComponent', () => {
  let component: SendPointComponent;
  let fixture: ComponentFixture<SendPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
