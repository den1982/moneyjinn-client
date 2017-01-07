import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {Error} from "../../model/error";
import {ErrorService} from "../../services/error.service";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  errors: Observable<Error[]>;

  constructor(private errorService: ErrorService) {
  }

  ngOnInit() {
    this.errors = Observable.of<Error[]>(this.errorService.getErrors());
  }

}
