import {Injectable} from "@angular/core";
import { DatePipe } from '@angular/common';
import {UserService} from "../services/user.service";
import {isNumber} from "util";

@Injectable()
export class DateUtil {
  constructor(private userService: UserService) {
  }

  formatDateToClientDate(value: any): string {
    let dateFormat: string = this.userService.getCurrentUserSettings().getSettingDateFormat();
    if (value) {
      let date = value instanceof Date ? value : new Date(value);
      let datePipe = new DatePipe("en-US");
      return datePipe.transform(date, dateFormat);
    }
  }

  formatClientDateToDate(value: string): Date {
    let dateFormat: string = this.userService.getCurrentUserSettings().getSettingDateFormat();
    if (value) {
      let year: string;
      let month: string;
      let day: string;


      let dateFormatRegExp = dateFormat.replace('yyyy', '(....)').replace('MM', '..').replace('dd', '..');
      year = this.getValue(dateFormatRegExp, value);
      if (year == null) return null;

      dateFormatRegExp = dateFormat.replace('MM', '(..)').replace('yyyy', '....').replace('dd', '..');
      month = this.getValue(dateFormatRegExp, value);
      if (month == null) return null;

      dateFormatRegExp = dateFormat.replace('dd', '(..)').replace('yyyy', '....').replace('MM', '..');
      day = this.getValue(dateFormatRegExp, value);
      if (day == null) return null;

      return new Date(Date.UTC(+year, +month - 1, +day));
    }
  }

  private getValue(dateFormat: string, dateStr: string): string {
    let value: string;
    let regexY = new RegExp(`^${dateFormat}$`);
    let resultY = regexY.exec(dateStr);
    if (resultY != null) {
      value = resultY[1];
    }
    if (value == null || isNumber(value)) {
      return null;
    }
    return value;
  }

}
