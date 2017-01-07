import {Injectable} from "@angular/core";
import {ErrorResponse} from "../model/rest/error-response";
import {Error} from "../model/error";

@Injectable()
export class ErrorService {
  private errors: Error[] = [];

  constructor() {
  }

  public addError(errorResponse: ErrorResponse) {
    this.errors.push(new Error(errorResponse.code, errorResponse.message));
    console.log('ERROR: ' + errorResponse.message);
  }

  public getErrors(): Error[] {
    return this.errors;
  }

}
