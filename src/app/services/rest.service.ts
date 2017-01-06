import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Md5} from "ts-md5/dist/md5";
import * as CryptoJS from "crypto-js";
import {UserService} from "./user.service";

@Injectable()
export abstract class RESTService {
  private baseUrl: string = 'http://localhost:8080/moneyflow/server/';
  private contentType: string = 'application/json';

  private static DATE_HEADER_NAME = "Requestdate";
  private static AUTH_HEADER_NAME = "Authentication";
  private static AUTH_HEADER_PREFIX = "MNF";
  private static AUTH_HEADER_SEPERATOR = ":";

  constructor(private http: Http, private userService: UserService) {
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  getHeaders(completeUrl: string, method: string, body: string): Headers {
    let user = this.userService.getCurrentUser();
    let headers = new Headers({'Content-Type': this.contentType});

    if (user) {
      let date = new Date().toUTCString();
      let username = user.username;
      let secret = user.password;
      let urlWithoutDomain = completeUrl.replace(/^.*\/\/[^\/]+/, '');

      let authCode = this.getRESTAuthorization(secret, method, this.contentType, urlWithoutDomain, date, body, username);
      headers.append(RESTService.AUTH_HEADER_NAME, authCode);
      headers.append(RESTService.DATE_HEADER_NAME, date);
    }
    return headers;
  }


  abstract getUsecaseUrl(): string;

  get(url): Observable<Response> {
    let completeUrl = this.getBaseUrl() + this.getUsecaseUrl() + url;

    return this.http
      .get(completeUrl, {headers: this.getHeaders(completeUrl, 'GET', null)})
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getRESTAuthorization(secret, method, contentType, urlWithoutDomain, date, body, username): string {
    if (secret == null) {
      secret = " "
    }

    let bodyMD5: string = "";
    if (body != null) {
      bodyMD5 = Md5.hashStr(body).toString();
    }

    let hashedSecret = CryptoJS.SHA1(secret).toString();

    let stringToSign = method + "\n" + bodyMD5 + "\n" + contentType + "\n" + date + "\n\n" + urlWithoutDomain;
    let hmac1 = CryptoJS.HmacSHA1(stringToSign, hashedSecret);
    let base64Hmac = btoa(hmac1);

    console.log("stringToSign: " + stringToSign);
    console.log("HMAC SHA1: " + hmac1.toString());
    console.log("Base64 HMAC SHA1: " + base64Hmac);

    return RESTService.AUTH_HEADER_PREFIX + username + RESTService.AUTH_HEADER_SEPERATOR + base64Hmac;
  }
}


