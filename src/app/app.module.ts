import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FMediatorModule } from 'f-mediator';
import { CreateUserRequest } from './domain/user/create/create-user.request';
import { CreateUserValidator } from './domain/user/create/create-user.validator';
import { CreateUserRequestHandler } from './domain/user/create/create-user.request-handler';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FMediatorModule.forRoot(),
    FMediatorModule.forFeature(CreateUserRequest, CreateUserValidator, CreateUserRequestHandler)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
