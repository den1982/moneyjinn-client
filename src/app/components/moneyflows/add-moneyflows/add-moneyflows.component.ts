import {Component, OnInit} from "@angular/core";
import {RESTMoneyflowService} from "../../../services/rest/restmoneyflow.service";
import {ShowAddMoneyflowsResponse} from "../../../model/rest/moneyflow/show-add-moneyflows-response";
import {PostingAccountTransport} from "../../../model/rest/transport/posting-account-transport";
import {Observable} from "rxjs";
import {CapitalsourceTransport} from "../../../model/rest/transport/capitalsource-transport";
import {ContractpartnerTransport} from "../../../model/rest/transport/contractpartner-transport";
import {PreDefMoneyflowTransport} from "../../../model/rest/transport/pre-def-moneyflow-transport";
import {AddMoneyflowsModel} from "./add-moneyflows-model";
import {DateUtil} from "../../../util/date-util";

@Component({
  selector: 'app-add-moneyflows',
  templateUrl: './add-moneyflows.component.html',
  styleUrls: ['./add-moneyflows.component.css']
})
export class AddMoneyflowsComponent implements OnInit {
  postingAccountTransports: Observable<PostingAccountTransport[]>;
  capitalsourceTransports: Observable<CapitalsourceTransport[]>;
  contractpartnerTransports: Observable<ContractpartnerTransport[]>;

  model: Observable<AddMoneyflowsModel[]>;

  constructor(private restMoneyflowService: RESTMoneyflowService,
              private dateUtil: DateUtil) {
  }

  ngOnInit() {
    this.restMoneyflowService.showAddMoneyflows(response => this.processResponseCallback(response));
  }

  processRequest() {
    this.model.subscribe(m => this.addMoneyflows(m));
  }

  private addMoneyflows(moneyflows: AddMoneyflowsModel[]) {
    for (let m of moneyflows) {
      console.log(m);
    }
  }
  private processResponseCallback(response: ShowAddMoneyflowsResponse) {

    if (response != null) {
      this.postingAccountTransports = Observable.of<PostingAccountTransport[]>(response.postingAccountTransport);
      this.capitalsourceTransports = Observable.of<CapitalsourceTransport[]>(response.capitalsourceTransport);
      this.contractpartnerTransports = Observable.of<ContractpartnerTransport[]>(response.contractpartnerTransport);

      let tempModel: AddMoneyflowsModel[] = (this.generateEmptyAddMoneyflowsModel(response.settingNumberOfFreeMoneyflows));
      tempModel = tempModel.concat(this.generateAddMoneyflowsModelForPreDefMoneyflows(response.preDefMoneyflowTransport));

      for (let m of tempModel) {
        console.log(m);
      }
      this.model = Observable.of<AddMoneyflowsModel[]>(tempModel);

    }
  }

  private generateEmptyAddMoneyflowsModel(rows: number): AddMoneyflowsModel[] {
    let models: AddMoneyflowsModel[] = [];

    while (rows > 0) {
      let model: AddMoneyflowsModel = new AddMoneyflowsModel;

      model.setId(rows * -1);
      model.setAdd(false);
      model.setBookingdate(new Date());
      model.setIsPreDefMoneyflow(false);

      models.push(model);
      rows--;
    }

    return models;
  }

  private generateAddMoneyflowsModelForPreDefMoneyflows(preDefMoneyflows: PreDefMoneyflowTransport[]): AddMoneyflowsModel[] {
    let models: AddMoneyflowsModel[] = [];

    for (let preDefMoneyflow of preDefMoneyflows) {
      let model: AddMoneyflowsModel = new AddMoneyflowsModel;

      model.setId(preDefMoneyflow.id);
      model.setAdd(false);
      model.setBookingdate(new Date());
      model.setAmount(preDefMoneyflow.amount);
      model.setContractpartnerId(preDefMoneyflow.contractpartnerid);
      model.setContractpartnerName(preDefMoneyflow.contractpartnername);
      model.setComment(preDefMoneyflow.comment);
      model.setPostingAccountId(preDefMoneyflow.postingaccountid);
      model.setCapitalsourceId(preDefMoneyflow.capitalsourceid);
      model.setCapitalsourceComment(preDefMoneyflow.capitalsourcecomment);
      model.setLastUsed(new Date(preDefMoneyflow.lastUsed));
      model.setIsPreDefMoneyflow(true);

      models.push(model);
    }

    return models;
  }

  parseDate(oldDate: Date, dateString: string): Date {
    console.log(oldDate + ' -> ' + dateString);
    if (dateString) {
      let newDate: Date = new Date(dateString);
      let newDateString: string = this.dateUtil.formatDate(newDate);
      console.log(newDateString + "----" + dateString);
      if (newDateString == dateString) {
        return newDate;
      }
    }
    return oldDate;
  }
}
