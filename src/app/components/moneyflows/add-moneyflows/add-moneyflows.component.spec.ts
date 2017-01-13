/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {AddMoneyflowsComponent} from "./add-moneyflows.component";

describe('AddMoneyflowsComponent', () => {
  let component: AddMoneyflowsComponent;
  let fixture: ComponentFixture<AddMoneyflowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddMoneyflowsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMoneyflowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
