import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMessageComponent } from './user-message.component';

describe('UserMessageComponent', () => {
  let component: UserMessageComponent;
  let fixture: ComponentFixture<UserMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
