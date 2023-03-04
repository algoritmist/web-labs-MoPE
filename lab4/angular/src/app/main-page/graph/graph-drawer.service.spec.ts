import { TestBed } from '@angular/core/testing';

import { GraphDrawerService } from './graph-drawer.service';

describe('GraphDrawerService', () => {
  let service: GraphDrawerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphDrawerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
