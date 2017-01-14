import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {UserService} from "../user.service";
import {ErrorService} from "../error.service";
import {RESTService} from "./rest.service";
import {ShowAddMoneyflowsResponse} from "../../model/rest/moneyflow/show-add-moneyflows-response";

@Injectable()
export class RESTMoneyflowService extends RESTService {

  constructor(http: Http,
              userService: UserService,
              errorService: ErrorService) {
    super(http, userService, errorService);
  }

  protected getUsecaseUrl(): string {
    return 'moneyflow/';
  }

  public showAddMoneyflows(callback: Function): void {
    super.get<ShowAddMoneyflowsResponse>('showAddMoneyflows', "showAddMoneyflowsResponse", callback);
  }

}
