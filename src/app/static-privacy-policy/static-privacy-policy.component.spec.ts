import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticPrivacyPolicyComponent } from './static-privacy-policy.component';

describe('StaticPrivacyPolicyComponent', () => {
  let component: StaticPrivacyPolicyComponent;
  let fixture: ComponentFixture<StaticPrivacyPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticPrivacyPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticPrivacyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
