import {Pipe, PipeTransform, Injectable} from "@angular/core";
import { DatePipe } from '@angular/common';
import {UserService} from "../../services/user.service";

/*

 IT WAS A NICE IDEA - DO NOT USE IT - ALWAYS PARSE STRINGS TO THE HTML TEMPLATE! AS LONG AS IT IS A FREE-TEXT INPUT FIELD EVERYTHING ELSE MAKES NO SENSE....

 */
@Injectable()
@Pipe({
  name: 'mjDate'
})
export class MoneyjinnDatePipe implements PipeTransform {
  constructor(private userService: UserService) {
  }

  transform(value: any, args: string[]): any {
    let dateFormat: string = this.userService.getCurrentUserSettings().getSettingDateFormat();
    if (!isNaN(+value)) {
      let date = value instanceof Date ? value : new Date(value);
      let datePipe = new DatePipe("en-US");
      return datePipe.transform(date, dateFormat);

    }
  }
}
