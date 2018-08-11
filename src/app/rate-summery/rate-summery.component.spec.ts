import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateSummeryComponent } from './rate-summery.component';

describe('RateSummeryComponent', () => {
  let component: RateSummeryComponent;
  let fixture: ComponentFixture<RateSummeryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateSummeryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
