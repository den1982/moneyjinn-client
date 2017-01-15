import {MoneyflowTransport} from "../transport/moneyflow-transport";
export class CreateMoneyflowsRequest {
  public moneyflowTransport: MoneyflowTransport[];
  public usedPreDefMoneyflowIds: number[];

  public setMoneyflowTransports(transports: MoneyflowTransport[]) {
    this.moneyflowTransport = transports;
  }

  public setUsedPreDefMoneyflowIds(iDs: number[]) {
    this.usedPreDefMoneyflowIds = iDs;
  }
}
