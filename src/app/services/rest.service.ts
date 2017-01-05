import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Md5} from 'ts-md5/dist/md5';

///<reference path="../../../../../typings/cryptojs/cryptojs.d.ts" />


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

    let md5 = Md5.hashStr('blah blah blah');
    console.log(md5);
    CryptoJS.HmacMD5("test", "test");
    return this.headers;
  }

  abstract getUsecaseUrl(): string;

  get(url): Observable<Response> {
    return this.http
      .get(this.getBaseUrl() + this.getUsecaseUrl() + url, {headers: this.getHeaders()})
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
