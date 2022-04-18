import { TestBed } from '@angular/core/testing';

import { AppListenerService } from './app-listener.service';

describe('AppListenerService', () => {
  let service: AppListenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppListenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
