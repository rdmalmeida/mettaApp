import { TestBed } from '@angular/core/testing';

import { ImgControllerService } from './img-controller.service';

describe('ImgControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImgControllerService = TestBed.get(ImgControllerService);
    expect(service).toBeTruthy();
  });
});
