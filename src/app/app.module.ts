import { TokenService } from './services/token.service';
import { BeforeLoginService } from './services/before-login.service';
import { AuthService } from 'src/app/services/auth.service';
import { ApiServiceService } from './services/api-service.service';
import { AfterLoginService } from './services/after-login.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routeComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppNavbarComponent } from './components/app-navbar/app-navbar.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    SignupComponent,
    ProfileComponent,
    RequestResetComponent,
    ResponseResetComponent,
    LoginComponent,
    routeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    AfterLoginService,
    ApiServiceService,
    AuthService,
    BeforeLoginService,
    TokenService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
