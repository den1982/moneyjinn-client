import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {Observable} from "rxjs";
import {Md5} from "ts-md5/dist/md5";
import * as CryptoJS from "crypto-js";
import {UserService} from "../user.service";
import {ErrorService} from "../error.service";
import {ErrorResponse} from "../../model/rest/error-response";

@Injectable()
export abstract class RESTService {
  private baseUrl: string = 'http://localhost:8080/moneyflow/server/';
  private contentType: string = 'application/json';

  private static DATE_HEADER_NAME = "Requestdate";
  private static AUTH_HEADER_NAME = "Authentication";
  private static AUTH_HEADER_PREFIX = "MNF";
  private static AUTH_HEADER_SEPERATOR = ":";

  constructor(private http: Http,
              protected userService: UserService,
              private errorService: ErrorService) {
  }

  abstract getUsecaseUrl(): string;

  public get<T>(url, jsonRootValue, callback: Function) {
    let completeUrl = this.baseUrl + this.getUsecaseUrl() + url;

    this.http
      .get(completeUrl, {headers: this.getHeaders(completeUrl, 'GET', null)})
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
      .subscribe(response => this.handleResponse<T>(response.json(), jsonRootValue, callback));
  }

  private handleResponse<T>(rawResponse: any, jsonRootValue: string, callback: Function) {
    let response: T;

    if (rawResponse != null) {
      if (rawResponse.hasOwnProperty("error")) {
        this.errorService.setError(rawResponse.error as ErrorResponse);
      } else if (rawResponse.hasOwnProperty(jsonRootValue)) {
        response = rawResponse[jsonRootValue] as T;
      }
    }

    callback(response);
  }

  private getHeaders(completeUrl: string, method: string, body: string): Headers {
    let user = this.userService.getCurrentUser();
    let headers = new Headers({'Content-Type': this.contentType});

    if (user) {
      let date = new Date().toUTCString();
      let username = user.getUsername();
      let secret = user.getPassword();
      let urlWithoutDomain = completeUrl.replace(/^.*\/\/[^\/]+/, '');

      let authCode = this.getRESTAuthorization(secret, method, this.contentType, urlWithoutDomain, date, body, username);
      headers.append(RESTService.AUTH_HEADER_NAME, authCode);
      headers.append(RESTService.DATE_HEADER_NAME, date);
    }
    return headers;
  }

  private getRESTAuthorization(secret, method, contentType, urlWithoutDomain, date, body, username): string {
    if (secret == null) {
      secret = " "
    }

    let bodyMD5: string = "";
    if (body != null) {
      // TODO: try this out with the first request which has a body. Maybe we can reduce the dependencies.
      //bodyMD5 = CryptoJS.MD5(body).toString();
      bodyMD5 = Md5.hashStr(body).toString();
    }

    let hashedSecret = CryptoJS.SHA1(secret).toString();

    let stringToSign = method + "\n" + bodyMD5 + "\n" + contentType + "\n" + date + "\n\n" + urlWithoutDomain;
    let hmac1 = CryptoJS.HmacSHA1(stringToSign, hashedSecret);
    let base64Hmac = btoa(hmac1);

    return RESTService.AUTH_HEADER_PREFIX + username + RESTService.AUTH_HEADER_SEPERATOR + base64Hmac;
  }
}


