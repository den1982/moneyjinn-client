import {Injectable} from "@angular/core";
import {DateFormatter} from "@angular/common/src/pipes/intl";
import {UserService} from "../services/user.service";

@Injectable()
export class DateUtil {
  constructor(private userService: UserService) {
  }

  formatDate(value: any): string {
    let dateFormat: string = this.userService.getCurrentUserSettings().getSettingDateFormat();
    if (value) {
      var date = value instanceof Date ? value : new Date(value);
      return DateFormatter.format(date, 'en', dateFormat);
    }
  }

}
