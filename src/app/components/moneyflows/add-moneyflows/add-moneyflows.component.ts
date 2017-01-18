import {Component, OnInit} from "@angular/core";
import {RESTMoneyflowService} from "../../../services/rest/restmoneyflow.service";
import {ShowAddMoneyflowsResponse} from "../../../model/rest/moneyflow/show-add-moneyflows-response";
import {PostingAccountTransport} from "../../../model/rest/transport/posting-account-transport";
import {CapitalsourceTransport} from "../../../model/rest/transport/capitalsource-transport";
import {ContractpartnerTransport} from "../../../model/rest/transport/contractpartner-transport";
import {AddMoneyflowsModel} from "./add-moneyflows-model";
import {MoneyflowTransport} from "../../../model/rest/transport/moneyflow-transport";
import {CreateMoneyflowsRequest} from "../../../model/rest/moneyflow/create-moneyflows-request";
import {CreateMoneyflowsResponse} from "../../../model/rest/moneyflow/create-moneyflows-response";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {AddMoneyflowsMapper} from "./add-moneyflows-mapper";
import {DateValidator} from "../../validators/date-validator";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-add-moneyflows',
  templateUrl: './add-moneyflows.component.html',
  styleUrls: ['./add-moneyflows.component.css']
})
export class AddMoneyflowsComponent implements OnInit {
  postingAccountTransports: PostingAccountTransport[];
  capitalsourceTransports: CapitalsourceTransport[];
  contractpartnerTransports: ContractpartnerTransport[];

  addForm: FormGroup;
  dataLoaded: boolean = false;
  dateFormat: string = this.userService.getCurrentUserSettings().getSettingDateFormat();

  constructor(private restMoneyflowService: RESTMoneyflowService,
              private mapper: AddMoneyflowsMapper,
              private userService: UserService,
              private fb: FormBuilder,
              private dateValidator: DateValidator) {
    this.setAddForm([]);
  }

  ngOnInit() {
    this.restMoneyflowService.showAddMoneyflows(response => this.processShowResponseCallback(response));
  }

  private setAddForm(rows: any[]) {

    this.addForm = this.fb.group({
      rows: this.fb.array(rows)
    });

    if (rows.length > 0) {
      this.subscribeAddToggled();
      this.dataLoaded = true;
    }
  }

  private createFormGroup(model: AddMoneyflowsModel[]): FormGroup[] {
    let group: FormGroup[] = [];

    for (let m of model) {
      group.push(this.fb.group({
        _id: [m.getId()],
        _add: [m.isAdd()],
        _privat: [m.isPrivat()],
        _bookingdate: [m.getBookingdate()],
        _invoicedate: [m.getInvoicedate()],
        _amount: [m.getAmount()],
        _contractpartnerId: [m.getContractpartnerId()],
        _comment: [m.getComment()],
        _postingAccountId: [m.getPostingAccountId()],
        _capitalsourceId: [m.getCapitalsourceId()],
        _lastUsed: new FormControl({value: m.getLastUsed(), disabled: true}),
        _isPreDefMoneyflow: [m.isPreDefMoneyflow()]
      }))
    }

    return group;
  }

  private subscribeAddToggled() {
    let rowsCtrl = (<any>this.addForm).controls.rows.controls;

    for (let rowCtrl of rowsCtrl) {

      let addCtrl = rowCtrl.controls._add.valueChanges;

      addCtrl.subscribe(toggled => {
        if (toggled == true) {

          Object.keys(rowCtrl.controls).forEach(key => {
            switch (key) {
              case '_bookingdate':
                rowCtrl.controls[key].setValidators(Validators.compose([Validators.required, this.dateValidator.validateDate.bind(this.dateValidator)]));
                rowCtrl.controls[key].updateValueAndValidity();
                break;
              case '_invoicedate':
                rowCtrl.controls[key].setValidators(this.dateValidator.validateDate.bind(this.dateValidator));
                rowCtrl.controls[key].updateValueAndValidity();
                break;
              case '_amount':
              case '_comment':
              case '_contractpartnerId':
              case '_postingAccountId':
              case '_capitalsourceId':
                rowCtrl.controls[key].setValidators(Validators.required);
                rowCtrl.controls[key].updateValueAndValidity();
                break;
            }
          });
        } else {
          Object.keys(rowCtrl.controls).forEach(key => {
            if (key != '_add') {
              rowCtrl.controls[key].setValidators(null);
              rowCtrl.controls[key].updateValueAndValidity();
            }
          })

        }
      })
    }
  }

  private processFormSubmit({value, valid} : {value: any, valid: boolean}) {
    let formModel: AddMoneyflowsModel[] = [];
    for (let m of value["rows"]) {
      formModel.push(new AddMoneyflowsModel(m));
    }
    this.addMoneyflows(formModel);
  }

  private addMoneyflows(moneyflows: AddMoneyflowsModel[]) {
    let transports: MoneyflowTransport[] = [];
    let usedPreDefMoneyflowIds: number[] = [];

    for (let m of moneyflows) {
      if (m.isAdd()) {
        transports.push(this.mapper.generateMoneyflowTransport(m));
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

  private processShowResponseCallback(response: ShowAddMoneyflowsResponse) {

    if (response != null) {
      this.postingAccountTransports = response.postingAccountTransport;
      this.capitalsourceTransports = response.capitalsourceTransport;
      this.contractpartnerTransports = response.contractpartnerTransport;

      let tempModel: AddMoneyflowsModel[] = (this.mapper.generateEmptyAddMoneyflowsModel(response.settingNumberOfFreeMoneyflows));
      tempModel = tempModel.concat(this.mapper.generateAddMoneyflowsModelForPreDefMoneyflows(response.preDefMoneyflowTransport));

      this.setAddForm(this.createFormGroup(tempModel));
    }
  }
}
