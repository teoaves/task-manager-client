import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared.module';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeModule } from './my-components/home/home.module';
import { UserModule } from './my-components/user/user.module';
import { TaskModule } from './my-components/task/task.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskSeriesModule } from './my-components/task-series/task-series.module';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserService } from 'src/services/user.service';
import { AuthInterceptor } from 'src/interceptor/auth.interceptor';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { PublicModule } from './my-components/public/public.module';
import { ErrorModule } from './my-components/error/error.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    SharedModule,
    RouterModule.forRoot([]),
    PublicModule,
    HomeModule,
    UserModule,
    TaskModule,
    TaskSeriesModule,
    ErrorModule,
    AppRoutingModule
  ],
  providers: [
    DatePipe, AuthenticationGuard, AuthenticationService, UserService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
