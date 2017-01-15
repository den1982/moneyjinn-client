import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {UserService} from "../user.service";
import {ErrorService} from "../error.service";
import {RESTService} from "./rest.service";
import {ShowAddMoneyflowsResponse} from "../../model/rest/moneyflow/show-add-moneyflows-response";
import {CreateMoneyflowsRequest} from "../../model/rest/moneyflow/create-moneyflows-request";
import {CreateMoneyflowsResponse} from "../../model/rest/moneyflow/create-moneyflows-response";

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

  public createMoneyflows(payload: CreateMoneyflowsRequest, callback: Function): void {
    super.post<CreateMoneyflowsResponse>('createMoneyflows', 'createMoneyflowsResponse', 'createMoneyflowsRequest', payload, callback);
  }


}
