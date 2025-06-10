export interface LeaveRequest {
  leaveRequestId?: number;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  employeeId: number;
  leaveType:string;
  requestDate:string;
  name?: string;

}

