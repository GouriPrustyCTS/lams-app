export interface Shift {
    shiftId?: number;
    shiftName: string;
    shiftDate: string;   // Ensure this property exists and is of type string (e.g., "YYYY-MM-DD")
    employeeId: number;
    shiftStartTime: string; // Ensure this property exists
    shiftEndTime: string;   // Ensure this property exists
  }
  