import {Component, OnInit} from "@angular/core";
import {Observable, BehaviorSubject, Subject} from "rxjs";
import {Error} from "../../model/error";
import {ErrorService} from "../../services/error.service";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',

  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  private showMe = false;

  private _subj1 = new BehaviorSubject<string>("a");
  private _subj2 = new Subject<string>();
  private _obs1 = this._subj1.asObservable();
  private _obs2 = this._subj2.asObservable();


  errors: Observable<Error[]>;

  constructor(private errorService: ErrorService) {
  }

  ngOnInit() {
    this.errors = Observable.of<Error[]>(this.errorService.getErrors());
  }

}
