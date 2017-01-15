export class MoneyflowTransport {
  public id: number;
  public userid: number;
  public bookingdate: Date;
  public invoicedate: Date;
  public amount: number;
  public capitalsourceid: number;
  public capitalsourcecomment: string;
  public contractpartnerid: number;
  public contractpartnername: string;
  public comment: string;
  public privat: number;
  public postingaccountid: number;
  public postingaccountname: string;


  public getId(): number {
    return this.id;
  }

  public setId(value: number) {
    this.id = value;
  }

  public getUserid(): number {
    return this.userid;
  }

  public setUserid(value: number) {
    this.userid = value;
  }

  public getBookingdate(): Date {
    return this.bookingdate;
  }

  public setBookingdate(value: Date) {
    this.bookingdate = value;
  }

  public getInvoicedate(): Date {
    return this.invoicedate;
  }

  public setInvoicedate(value: Date) {
    this.invoicedate = value;
  }

  public getAmount(): number {
    return this.amount;
  }

  public setAmount(value: number) {
    this.amount = value;
  }

  public getCapitalsourceid(): number {
    return this.capitalsourceid;
  }

  public setCapitalsourceid(value: number) {
    this.capitalsourceid = value;
  }

  public getCapitalsourcecomment(): string {
    return this.capitalsourcecomment;
  }

  public setCapitalsourcecomment(value: string) {
    this.capitalsourcecomment = value;
  }

  public getContractpartnerid(): number {
    return this.contractpartnerid;
  }

  public setContractpartnerid(value: number) {
    this.contractpartnerid = value;
  }

  public getContractpartnername(): string {
    return this.contractpartnername;
  }

  public setContractpartnername(value: string) {
    this.contractpartnername = value;
  }

  public getComment(): string {
    return this.comment;
  }

  public setComment(value: string) {
    this.comment = value;
  }

  public getPrivat(): number {
    return this.privat;
  }

  public setPrivat(value: number) {
    this.privat = value;
  }

  public getPostingaccountid(): number {
    return this.postingaccountid;
  }

  public setPostingaccountid(value: number) {
    this.postingaccountid = value;
  }

  public getPostingaccountname(): string {
    return this.postingaccountname;
  }

  public setPostingaccountname(value: string) {
    this.postingaccountname = value;
  }
}
