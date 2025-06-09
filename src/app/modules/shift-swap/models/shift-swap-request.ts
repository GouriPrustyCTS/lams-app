export interface ShiftSwapRequest {
    id?: number;
    requesterEmployeeId: number; // This will be obtained from user context, not form input
    requestedShiftId: number; // This is the user's "Current Shift ID" they want to swap out of
    targetEmployeeId: number;
    targetShiftId: number;
    status: string; // e.g., "PENDING", "APPROVED", "REJECTED"
  }
  