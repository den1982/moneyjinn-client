import {Component, Inject, Renderer, AfterViewInit} from "@angular/core";
import {routes} from "../../app.module";
import {Router, NavigationEnd} from "@angular/router";
import {DOCUMENT} from "@angular/platform-browser";

@Component({
  selector: 'ngbd-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements AfterViewInit {
  public routes: any = routes;
  public hash: string = '';
  public isShown: boolean = false;
  
  private router: Router;

  public constructor(router: Router) {
    this.router = router;
    this.routes = this.routes.filter((v: any) => v.data[1]);
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.hash = event.url;
      }
    });
  }

  public ngAfterViewInit(): any {
    // todo: remove this sh**
    const getUrl = (router: Router) => router.routerState.snapshot.url.slice(0, router.routerState.snapshot.url.indexOf('#'));
    let _prev = getUrl(this.router);
    this.router.events.subscribe((event: any) => {
      let _cur = getUrl(this.router);
      if (event instanceof NavigationEnd && _cur !== _prev) {
        _prev = _cur;
      }
    });
  }

  public toggle(): void {
    this.isShown = !this.isShown;
  }
}
