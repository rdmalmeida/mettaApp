import { TestBed } from '@angular/core/testing';

import { ImgUtilService } from './img-util.service';

describe('ImgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImgUtilService = TestBed.get(ImgUtilService);
    expect(service).toBeTruthy();
  });
});
