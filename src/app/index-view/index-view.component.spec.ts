import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexViewComponent } from './index-view.component';

describe('IndexViewComponent', () => {
  let component: IndexViewComponent;
  let fixture: ComponentFixture<IndexViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
