/* tslint:disable:no-unused-variable */
import {TestBed, inject} from "@angular/core/testing";
import {RESTMoneyflowService} from "./restmoneyflow.service";

describe('RESTMoneyflowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RESTMoneyflowService]
    });
  });

  it('should ...', inject([RESTMoneyflowService], (service: RESTMoneyflowService) => {
    expect(service).toBeTruthy();
  }));
});
