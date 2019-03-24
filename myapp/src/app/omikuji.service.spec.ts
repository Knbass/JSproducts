import { TestBed } from '@angular/core/testing';

import { OmikujiService } from './omikuji.service';

describe('OmikujiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OmikujiService = TestBed.get(OmikujiService);
    expect(service).toBeTruthy();
  });
});
