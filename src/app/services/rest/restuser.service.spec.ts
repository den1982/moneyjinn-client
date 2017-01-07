/* tslint:disable:no-unused-variable */
import {TestBed, inject} from "@angular/core/testing";
import {RESTUserService} from "./restuser.service";

describe('RESTUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RESTUserService]
    });
  });

  it('should ...', inject([RESTUserService], (service: RESTUserService) => {
    expect(service).toBeTruthy();
  }));
});
