import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnnouncementFormComponent } from './create-announcement-form.component';

describe('CreateAnnouncementFormComponent', () => {
  let component: CreateAnnouncementFormComponent;
  let fixture: ComponentFixture<CreateAnnouncementFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAnnouncementFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAnnouncementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
