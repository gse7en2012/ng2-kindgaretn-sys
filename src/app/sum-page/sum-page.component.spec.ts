/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SumPageComponent } from './sum-page.component';

describe('SumPageComponent', () => {
  let component: SumPageComponent;
  let fixture: ComponentFixture<SumPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SumPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SumPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
