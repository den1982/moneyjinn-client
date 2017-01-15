import {Pipe, PipeTransform, Injectable} from "@angular/core";
import {DateFormatter} from "@angular/common/src/pipes/intl";
import {UserService} from "../../services/user.service";
import {isDate} from "@angular/core/src/facade/lang";

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
    if (value && isDate(value)) {
      var date = value instanceof Date ? value : new Date(value);
      return DateFormatter.format(date, 'en', dateFormat);
    }
  }
}
