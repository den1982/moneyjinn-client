import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export abstract class RESTService {
  private baseUrl: string = 'http://localhost:8080/moneyflow/server/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  getHeaders(): Headers {
    return this.headers;
  }

  abstract getUsecaseUrl(): string;

  get(url): Observable<Response> {
    return this.http
      .get(this.getBaseUrl() + this.getUsecaseUrl() + url, {headers: this.getHeaders()})
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
