import { TestBed } from '@angular/core/testing';

import { DatadomeIntegrationService } from './datadome-integration.service';

describe('DatadomeIntegrationService', () => {
  let service: DatadomeIntegrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatadomeIntegrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
