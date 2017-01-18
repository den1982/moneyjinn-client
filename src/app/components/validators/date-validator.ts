import {DateUtil} from "../../util/date-util";
import {FormControl} from "@angular/forms";
import {Injectable} from "@angular/core";

@Injectable()
export class DateValidator {
  validator: Function;

  constructor(private dateUtil: DateUtil) {
  }

  public validateDate(c: FormControl) {

    // if the field is empty, do not validate it
    if (c.value == "" || c.value == null)
      return null;

    // check if the date can be parsed
    let parsedDate: Date = this.dateUtil.formatClientDateToDate(c.value);
    if (parsedDate == null) {
      return {validateDate: {valid: false}};
    }

    // check if the parsed date is identical to the date the user entered
    let formattedDate: string = this.dateUtil.formatDateToClientDate(parsedDate);
    if (c.value != formattedDate) {
      return {validateDate: {valid: false}};
    }
  }
}
