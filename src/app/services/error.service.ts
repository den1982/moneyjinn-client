import {Injectable} from "@angular/core";
import {ErrorResponse} from "../model/rest/error-response";
import {Error} from "../model/error";

@Injectable()
export class ErrorService {
  private errors: Error[] = [];

  constructor() {
  }

  public setError(errorResponse: ErrorResponse) {
    this.errors.splice(0, this.errors.length);
    this.addError(errorResponse);
  }

  public addError(errorResponse: ErrorResponse) {
    this.errors.push(new Error(errorResponse.code, errorResponse.message));
  }

  public getErrors(): Error[] {
    return this.errors;
  }

}
