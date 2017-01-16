import {Component, OnInit, ViewChild} from "@angular/core";
import {RESTMoneyflowService} from "../../../services/rest/restmoneyflow.service";
import {ShowAddMoneyflowsResponse} from "../../../model/rest/moneyflow/show-add-moneyflows-response";
import {PostingAccountTransport} from "../../../model/rest/transport/posting-account-transport";
import {CapitalsourceTransport} from "../../../model/rest/transport/capitalsource-transport";
import {ContractpartnerTransport} from "../../../model/rest/transport/contractpartner-transport";
import {PreDefMoneyflowTransport} from "../../../model/rest/transport/pre-def-moneyflow-transport";
import {AddMoneyflowsModel} from "./add-moneyflows-model";
import {DateUtil} from "../../../util/date-util";
import {MoneyflowTransport} from "../../../model/rest/transport/moneyflow-transport";
import {CreateMoneyflowsRequest} from "../../../model/rest/moneyflow/create-moneyflows-request";
import {CreateMoneyflowsResponse} from "../../../model/rest/moneyflow/create-moneyflows-response";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-add-moneyflows',
  templateUrl: './add-moneyflows.component.html',
  styleUrls: ['./add-moneyflows.component.css']
})
export class AddMoneyflowsComponent implements OnInit {
  postingAccountTransports: PostingAccountTransport[];
  capitalsourceTransports: CapitalsourceTransport[];
  contractpartnerTransports: ContractpartnerTransport[];

  model: AddMoneyflowsModel[];

  addForm: NgForm;
  @ViewChild('addForm') currentForm: NgForm;


  constructor(private restMoneyflowService: RESTMoneyflowService,
              private dateUtil: DateUtil) {
  }


  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.addForm) {
      return;
    }
    this.addForm = this.currentForm;
    if (this.addForm) {
      this.addForm.valueChanges
        .debounceTime(500)
        .subscribe(data => console.log(data));
    }
  }

  private processRequest() {
    this.addMoneyflows(this.model);
  }

  private addMoneyflows(moneyflows: AddMoneyflowsModel[]) {
    let transports: MoneyflowTransport[] = [];
    let usedPreDefMoneyflowIds: number[] = [];

    for (let m of moneyflows) {
      if (m.isAdd()) {
        transports.push(this.generateMoneyflowTransport(m));
        if (m.isPreDefMoneyflow()) {
          usedPreDefMoneyflowIds.push(m.getId());
        }
      }
    }

    let createMoneyflowsRequest: CreateMoneyflowsRequest = new CreateMoneyflowsRequest();
    createMoneyflowsRequest.setMoneyflowTransports(transports);
    createMoneyflowsRequest.setUsedPreDefMoneyflowIds(usedPreDefMoneyflowIds);

    this.restMoneyflowService.createMoneyflows(createMoneyflowsRequest, response => this.processCreateResponseCallback((response)));
  }

  private processCreateResponseCallback(response: CreateMoneyflowsResponse) {
    console.log(response);
    if (!response.result) {
      for (let validationItem of response.validationItemTransport) {
        // TODO: Process Validation Results
        console.log(validationItem);
      }
    }
  }

  ngOnInit() {
    this.restMoneyflowService.showAddMoneyflows(response => this.processShowResponseCallback(response));
  }

  private processShowResponseCallback(response: ShowAddMoneyflowsResponse) {

    if (response != null) {
      this.postingAccountTransports = response.postingAccountTransport;
      this.capitalsourceTransports = response.capitalsourceTransport;
      this.contractpartnerTransports = response.contractpartnerTransport;

      let tempModel: AddMoneyflowsModel[] = (this.generateEmptyAddMoneyflowsModel(response.settingNumberOfFreeMoneyflows));
      tempModel = tempModel.concat(this.generateAddMoneyflowsModelForPreDefMoneyflows(response.preDefMoneyflowTransport));

      for (let m of tempModel) {
        console.log(m);
      }
      this.model = tempModel;

    }
  }

  private generateMoneyflowTransport(model: AddMoneyflowsModel): MoneyflowTransport {
    let transport: MoneyflowTransport = new MoneyflowTransport;

    transport.setId(model.getId());
    transport.setBookingdate(new Date(model.getBookingdate()));
    if (model.getInvoicedate() != null) {
      transport.setInvoicedate(new Date(model.getInvoicedate()));
    }
    transport.setAmount(model.getAmount());
    transport.setComment(model.getComment());
    transport.setCapitalsourceid(model.getCapitalsourceId());
    transport.setContractpartnerid(model.getContractpartnerId());
    transport.setPostingaccountid(model.getPostingAccountId());

    console.log(transport);
    return transport;
  }

  private generateEmptyAddMoneyflowsModel(rows: number): AddMoneyflowsModel[] {
    let models: AddMoneyflowsModel[] = [];

    while (rows > 0) {
      let model: AddMoneyflowsModel = new AddMoneyflowsModel;

      model.setId(rows * -1);
      model.setAdd(false);
      model.setBookingdate(this.dateUtil.formatDate(new Date()));
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
      model.setBookingdate(this.dateUtil.formatDate(new Date()));
      model.setAmount(preDefMoneyflow.amount);
      model.setContractpartnerId(preDefMoneyflow.contractpartnerid);
      model.setContractpartnerName(preDefMoneyflow.contractpartnername);
      model.setComment(preDefMoneyflow.comment);
      model.setPostingAccountId(preDefMoneyflow.postingaccountid);
      model.setCapitalsourceId(preDefMoneyflow.capitalsourceid);
      model.setCapitalsourceComment(preDefMoneyflow.capitalsourcecomment);
      if (preDefMoneyflow.lastUsed != null) {
        model.setLastUsed(this.dateUtil.formatDate(new Date(preDefMoneyflow.lastUsed)));
      }
      model.setIsPreDefMoneyflow(true);

      models.push(model);
    }

    return models;
  }

}
