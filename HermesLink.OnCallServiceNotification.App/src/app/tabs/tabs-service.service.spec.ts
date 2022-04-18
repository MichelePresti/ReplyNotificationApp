import { TestBed } from '@angular/core/testing';

import { TabsServiceService } from './tabs-service.service';

describe('TabsServiceService', () => {
  let service: TabsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
