import {PostingAccountTransport} from "../transport/posting-account-transport";
import {ContractpartnerTransport} from "../transport/contractpartner-transport";
import {CapitalsourceTransport} from "../transport/capitalsource-transport";
import {PreDefMoneyflowTransport} from "../transport/pre-def-moneyflow-transport";
export class ShowAddMoneyflowsResponse {
  public preDefMoneyflowTransport: PreDefMoneyflowTransport[];
  public capitalsourceTransport: CapitalsourceTransport[];
  public contractpartnerTransport: ContractpartnerTransport [];
  public postingAccountTransport: PostingAccountTransport[];
  public settingNumberOfFreeMoneyflows: number;

}
