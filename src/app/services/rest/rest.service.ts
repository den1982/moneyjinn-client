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

  /**
   * Returns the "subdirectory" part of the URL which is specific to the REST-Controller on serverside.
   */
  protected abstract getUsecaseUrl(): string;

  /**
   * Issues a HTTP GET Call with the given parameters
   * @param url
   * The usecase specific part of the URL.
   * @param jsonRootValue
   * The name of the root value in the JSON which contains the payload (see: <b>WRAP_ROOT_VALUE</b> on <a href="https://github.com/FasterXML/jackson-databind/wiki/Serialization-features">Serialization features</a>)
   * @param callback
   * The callback method which will be executed when the server did respond and the response was not an {@link ErrorResponse}
   */
  public get<T>(url, jsonRootValue, callback: Function) {
    let completeUrl = this.baseUrl + this.getUsecaseUrl() + url;

    this.http
      .get(completeUrl, {headers: this.getHeaders(completeUrl, 'GET', null)})
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
      .subscribe(response => this.handleResponse<T>(response.json(), jsonRootValue, callback));
  }

  /**
   * This method checks if the response received by the server consists of an {@link ErrorResponse} or the expected usecase specific response.
   *
   * @param rawResponse
   * The response received from the server;
   * @param jsonRootValue
   * The name of the root value in the JSON which contains the payload (see: <b>WRAP_ROOT_VALUE</b> on <a href="https://github.com/FasterXML/jackson-databind/wiki/Serialization-features">Serialization features</a>)
   * @param callback
   * The callback method which will be executed when the server did respond and the response was not an {@link ErrorResponse}
   */
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

  /**
   * Returns the headers used for every server query (Content-Type, Authorization, Requestdate)
   *
   * @param completeUrl
   * @param method
   * @param body
   * @returns {Headers}
   */
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

  /**
   * This function works basically as described in
   * <a href= "http://docs.aws.amazon.com/AmazonS3/latest/dev/RESTAuthentication.html" >Amazon
   * Simple Storage Service - REST Authentication</a>
   *
   * TODO: Change the whole authorization procedure as it is not safe to store the users password on client side.
   *
   * @param secret
   * The password of the logged in user (cleartext)
   * @param method
   * The HTTP method
   * @param contentType
   * The content of the HTTP Header "Content-Type"
   * @param urlWithoutDomain
   * The url without the domain-part
   * @param date
   * The content of the HTTP Header "Requestdate"
   * @param body
   * The body (which is sent with PUT, POST....)
   * @param username
   * The username of the logged in user
   * @return Content of the Authorization Header
   */
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


