import { TestBed, inject } from '@angular/core/testing';

import { WordofthedayService } from './wordoftheday.service';

describe('WordofthedayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WordofthedayService]
    });
  });

  it('should be created', inject([WordofthedayService], (service: WordofthedayService) => {
    expect(service).toBeTruthy();
  }));
});
