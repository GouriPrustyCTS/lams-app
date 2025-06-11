import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAttendanceComponent } from './delete-attendance.component';

describe('DeleteAttendanceComponent', () => {
  let component: DeleteAttendanceComponent;
  let fixture: ComponentFixture<DeleteAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteAttendanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
