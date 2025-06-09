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
  // Initialize the shift object with ALL properties as expected by the backend DTO
  shift: Shift = {
    shiftName: '',
    shiftDate: '',      // Initialize shiftDate
    employeeId: 0,
    shiftStartTime: '', // Initialize shiftStartTime
    shiftEndTime: ''    // Initialize shiftEndTime
  };
  isEditMode: boolean = false;
  shiftId: number | null = null;

  constructor(
    private shiftService: ShiftService,
    public router: Router,
    private route: ActivatedRoute
  ) { }

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
        (data) => {
          this.shift = data;
        },
        (error) => {
          console.error('Error loading shift:', error);
          this.router.navigate(['/shifts']);
        }
      );
    }
  }

  onSubmit(): void {
    console.log('Attempting to send Shift data:', this.shift);

    if (this.isEditMode && this.shiftId) {
      this.shiftService.updateShift(this.shiftId, this.shift).subscribe(
        () => {
          console.log('Shift updated successfully');
          this.router.navigate(['/shifts']);
        },
        (error) => {
          console.error('Error updating shift:', error);
          if (error.error) {
            console.error('Backend Validation Errors:', error.error);
          }
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
          if (error.error) {
            console.error('Backend Validation Errors:', error.error);
          }
        }
      );
    }
  }
}
