/* tslint:disable:no-unused-variable */
import {TestBed, inject} from "@angular/core/testing";
import {RESTService} from "./rest.service";

describe('RESTService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RESTService]
    });
  });

  it('should ...', inject([RESTService], (service: RESTService) => {
    expect(service).toBeTruthy();
  }));
});
