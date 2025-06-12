import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Shift } from '../../models/shift'; // Ensure this imports the CORRECTED Shift interface
import { ShiftService } from '../../services/shift.service';

@Component({
  selector: 'app-shift-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shift-form.component.html',
  styleUrls: ['./shift-form.component.css']
})
export class ShiftFormComponent implements OnInit {
  shift: Shift = {
    shiftName: '',
    shiftDate: '',
    employeeId: 0,
    shiftStartTime: '',
    shiftEndTime: ''
  };
  isEditMode = false;
  shiftId: number | null = null;
  message: string | null = null; 
  isSuccess: boolean = false;
  dateValidationError = false;
  timeValidationError = false;

  constructor(
    private shiftService: ShiftService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.shiftId = +idParam;
        this.isEditMode = true;
        this.loadShift();
      }
    });
  }

  loadShift(): void {
    if (this.shiftId) {
      this.shiftService.getShiftById(this.shiftId).subscribe(
        (data) => this.shift = data,
        (error) => {
          console.error('Error loading shift:', error);
          this.router.navigate(['/shifts']);
        }
      );
    }
  }

  onSubmit(): void {
    this.dateValidationError = false;
    this.timeValidationError = false;

    // Validate shift date (at least 24 hrs from now)
    const now = new Date();
    const shiftDateTime = new Date(this.shift.shiftDate);
    shiftDateTime.setHours(0, 0, 0, 0);  // just date comparison
    const minValidDate = new Date(now.getTime() + 24 * 60 * 60 * 1000); // now + 24h
    minValidDate.setHours(0, 0, 0, 0);

    if (shiftDateTime < minValidDate) {
      this.dateValidationError = true;
      return;
    }

    // Validate shift time difference (≥ 4 hours)
    const [startHour, startMin] = this.shift.shiftStartTime.split(':').map(Number);
    const [endHour, endMin] = this.shift.shiftEndTime.split(':').map(Number);
    const startTime = startHour * 60 + startMin;
    const endTime = endHour * 60 + endMin;

    const diff = endTime - startTime;
    if (diff < 240) { // 4 hours = 240 minutes
      this.timeValidationError = true;
      return;
    }

    // Submit the shift data
    if (this.isEditMode && this.shiftId) {
      this.shiftService.updateShift(this.shiftId, this.shift).subscribe(
        () => {
          console.log('Shift updated successfully');
          this.router.navigate(['/shifts']);
        },
        (error) => {
          console.error('Error updating shift:', error);
        }
      );
    } else {
      this.shiftService.createShift(this.shift).subscribe(
        () => {
          console.log('Shift created successfully');
          this.router.navigate(['/shifts']);
        },
        (error) => {
          console.error('Error creating shift:', error);
        }
      );
    }
  }
}
