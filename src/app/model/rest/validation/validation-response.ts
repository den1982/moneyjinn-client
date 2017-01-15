import {ValidationItemTransport} from "../transport/validation-item-transport";
export class ValidationResponse {
  public result: boolean;
  public validationItemTransport: ValidationItemTransport[];
}
