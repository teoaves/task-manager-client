import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { taskRoutes } from './my-components/task/task-routing.module';
import { taskSeriesRoutes } from './my-components/task-series/task-series-routing.module';
import { AuthenticationService } from 'src/services/authentication.service';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  isUserLoggedIn = false;
  taskRoutes = taskRoutes;
  taskSeriesRoutes = taskSeriesRoutes;
  title = 'task-client';
  isSidebarOpened: boolean;
  currentRoute: any = 'Home';

  role: string;
  public menuItems: any = [];

  constructor(
    public router: Router, private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        this.currentRoute = event;
        if (this.router.url.includes('user')) {
          this.menuItems = null;
        }
        if (this.router.url.includes('task')) {
          this.menuItems = this.taskRoutes;
        }
        if (this.router.url.includes('task-series')) {
          this.menuItems = this.taskSeriesRoutes;
        }
      });

    this.authenticationService.changes.subscribe(role => this.role = role);
  }

  onGetIsSideBarOpened(data: boolean) {
    this.isSidebarOpened = data;
  }
}
