export class AddMoneyflowsModel {
  private _id: number;
  private _add: boolean;
  private _privat: boolean;
  private _bookingdate: Date;
  private _invoicedate: Date;
  private _amount: number;
  private _contractpartnerId: number;
  private _contractpartnerName: string;
  private _comment: string;
  private _postingAccountId: number;
  private _capitalsourceId: number;
  private _capitalsourceComment: string;
  private _lastUsed: Date;
  private _isPreDefMoneyflow: boolean;


  getId(): number {
    return this._id;
  }

  setId(value: number) {
    this._id = value;
  }

  getAdd(): boolean {
    return this._add;
  }

  setAdd(value: boolean) {
    this._add = value;
  }

  getPrivat(): boolean {
    return this._privat;
  }

  setPrivat(value: boolean) {
    this._privat = value;
  }

  getBookingdate(): Date {
    return this._bookingdate;
  }

  setBookingdate(value: Date) {
    this._bookingdate = value;
  }

  getInvoicedate(): Date {
    return this._invoicedate;
  }

  setInvoicedate(value: Date) {
    this._invoicedate = value;
  }

  getAmount(): number {
    return this._amount;
  }

  setAmount(value: number) {
    this._amount = value;
  }

  getContractpartnerId(): number {
    return this._contractpartnerId;
  }

  setContractpartnerId(value: number) {
    this._contractpartnerId = value;
  }

  getContractpartnerName(): string {
    return this._contractpartnerName;
  }

  setContractpartnerName(value: string) {
    this._contractpartnerName = value;
  }

  getComment(): string {
    return this._comment;
  }

  setComment(value: string) {
    this._comment = value;
  }

  getPostingAccountId(): number {
    return this._postingAccountId;
  }

  setPostingAccountId(value: number) {
    this._postingAccountId = value;
  }

  getCapitalsourceId(): number {
    return this._capitalsourceId;
  }

  setCapitalsourceId(value: number) {
    this._capitalsourceId = value;
  }

  getCapitalsourceComment(): string {
    return this._capitalsourceComment;
  }

  setCapitalsourceComment(value: string) {
    this._capitalsourceComment = value;
  }

  getLastUsed(): Date {
    return this._lastUsed;
  }

  setLastUsed(value: Date) {
    this._lastUsed = value;
  }

  getIsPreDefMoneyflow(): boolean {
    return this._isPreDefMoneyflow;
  }

  setIsPreDefMoneyflow(value: boolean) {
    this._isPreDefMoneyflow = value;
  }
}
