export class AddMoneyflowsModel {
  private _id: number;
  private _add: boolean;
  private _privat: boolean;
  private _bookingdate: string;
  private _invoicedate: string;
  private _amount: number;
  private _contractpartnerId: number;
  private _contractpartnerName: string;
  private _comment: string;
  private _postingAccountId: number;
  private _capitalsourceId: number;
  private _capitalsourceComment: string;
  private _lastUsed: string;
  private _isPreDefMoneyflow: boolean;


  constructor(data) {
    Object.assign(this, data);
  }

  public getId(): number {
    return this._id;
  }

  public setId(value: number) {
    this._id = value;
  }

  public isAdd(): boolean {
    return this._add;
  }

  public setAdd(value: boolean) {
    this._add = value;
  }

  public isPrivat(): boolean {
    return this._privat;
  }

  public setPrivat(value: boolean) {
    this._privat = value;
  }

  public getBookingdate(): string {
    return this._bookingdate;
  }

  public setBookingdate(value: string) {
    this._bookingdate = value;
  }

  public getInvoicedate(): string {
    return this._invoicedate;
  }

  public setInvoicedate(value: string) {
    this._invoicedate = value;
  }

  public getAmount(): number {
    return this._amount;
  }

  public setAmount(value: number) {
    this._amount = value;
  }

  public getContractpartnerId(): number {
    return this._contractpartnerId;
  }

  public setContractpartnerId(value: number) {
    this._contractpartnerId = value;
  }

  public getContractpartnerName(): string {
    return this._contractpartnerName;
  }

  public setContractpartnerName(value: string) {
    this._contractpartnerName = value;
  }

  public getComment(): string {
    return this._comment;
  }

  public setComment(value: string) {
    this._comment = value;
  }

  public getPostingAccountId(): number {
    return this._postingAccountId;
  }

  public setPostingAccountId(value: number) {
    this._postingAccountId = value;
  }

  public getCapitalsourceId(): number {
    return this._capitalsourceId;
  }

  public setCapitalsourceId(value: number) {
    this._capitalsourceId = value;
  }

  public getCapitalsourceComment(): string {
    return this._capitalsourceComment;
  }

  public setCapitalsourceComment(value: string) {
    this._capitalsourceComment = value;
  }

  public getLastUsed(): string {
    return this._lastUsed;
  }

  public setLastUsed(value: string) {
    this._lastUsed = value;
  }

  public isPreDefMoneyflow(): boolean {
    return this._isPreDefMoneyflow;
  }

  public setIsPreDefMoneyflow(value: boolean) {
    this._isPreDefMoneyflow = value;
  }
}
