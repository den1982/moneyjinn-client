import {AddMoneyflowsModel} from "./add-moneyflows-model";
import {MoneyflowTransport} from "../../../model/rest/transport/moneyflow-transport";
import {PreDefMoneyflowTransport} from "../../../model/rest/transport/pre-def-moneyflow-transport";
import {DateUtil} from "../../../util/date-util";
import {Injectable} from "@angular/core";

@Injectable()
export class AddMoneyflowsMapper {
  constructor(private dateUtil: DateUtil) {
  }

  public generateMoneyflowTransport(model: AddMoneyflowsModel): MoneyflowTransport {
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

  public generateEmptyAddMoneyflowsModel(rows: number): AddMoneyflowsModel[] {
    let models: AddMoneyflowsModel[] = [];

    while (rows > 0) {
      let model: AddMoneyflowsModel = new AddMoneyflowsModel(null);

      model.setId(rows * -1);
      model.setAdd(false);
      model.setBookingdate(this.dateUtil.formatDateToClientDate(new Date()));
      model.setIsPreDefMoneyflow(false);

      models.push(model);
      rows--;
    }

    return models;
  }

  public generateAddMoneyflowsModelForPreDefMoneyflows(preDefMoneyflows: PreDefMoneyflowTransport[]): AddMoneyflowsModel[] {
    let models: AddMoneyflowsModel[] = [];

    for (let preDefMoneyflow of preDefMoneyflows) {
      let model: AddMoneyflowsModel = new AddMoneyflowsModel(null);

      model.setId(preDefMoneyflow.id);
      model.setAdd(false);
      model.setBookingdate(this.dateUtil.formatDateToClientDate(new Date()));
      model.setAmount(preDefMoneyflow.amount);
      model.setContractpartnerId(preDefMoneyflow.contractpartnerid);
      model.setContractpartnerName(preDefMoneyflow.contractpartnername);
      model.setComment(preDefMoneyflow.comment);
      model.setPostingAccountId(preDefMoneyflow.postingaccountid);
      model.setCapitalsourceId(preDefMoneyflow.capitalsourceid);
      model.setCapitalsourceComment(preDefMoneyflow.capitalsourcecomment);
      if (preDefMoneyflow.lastUsed != null) {
        model.setLastUsed(this.dateUtil.formatDateToClientDate(new Date(preDefMoneyflow.lastUsed)));
      }
      model.setIsPreDefMoneyflow(true);

      models.push(model);
    }

    return models;
  }

}
