/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {AddMoneyflowComponent} from "./add-moneyflow.component";

describe('AddMoneyflowComponent', () => {
  let component: AddMoneyflowComponent;
  let fixture: ComponentFixture<AddMoneyflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddMoneyflowComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMoneyflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
