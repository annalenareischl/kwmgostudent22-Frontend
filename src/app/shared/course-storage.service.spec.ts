import { TestBed } from '@angular/core/testing';


import { CourseStorageService } from './course-storage.service';

describe('CourseStorageService', () => {
  let service: CourseStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
