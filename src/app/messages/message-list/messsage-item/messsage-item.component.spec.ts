import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesssageItemComponent } from './messsage-item.component';

describe('MesssageItemComponent', () => {
  let component: MesssageItemComponent;
  let fixture: ComponentFixture<MesssageItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesssageItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesssageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
