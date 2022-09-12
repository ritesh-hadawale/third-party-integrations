import { TestBed } from '@angular/core/testing';

import { RiskifiedBeaconService } from './riskified-beacon.service';

describe('RiskifiedBeaconService', () => {
  let service: RiskifiedBeaconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiskifiedBeaconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
