import { TestBed } from '@angular/core/testing';

import { ShiftSwapRequestService } from './shift-swap-request.service';

describe('ShiftSwapRequestService', () => {
  let service: ShiftSwapRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShiftSwapRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
