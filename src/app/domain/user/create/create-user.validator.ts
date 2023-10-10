import { CreateUserRequest } from './create-user.request';
import { Observable, of } from 'rxjs';
import { DataContext } from '../../../data-context/data-context';
import { IFValidator } from 'f-mediator';
import { CreateUserResponse } from './create-user-response';
import { Injectable } from '@angular/core';

@Injectable()
export class CreateUserValidator implements IFValidator<CreateUserRequest, CreateUserResponse> {

  constructor(
    private dataContext: DataContext
  ) {
  }

  public validate(request: CreateUserRequest): Observable<Error[]> {
    // console.log('CreateUserValidator', request);
    // const isNameExist = this.dataContext?.getUsers().find(u => u.name === request.name);
    // if (isNameExist) {
    //   throw new Error('name already exist');
    // }
    // const isEmailExist = this.dataContext.getUsers().find(u => u.email === request.email);
    // if (isEmailExist) {
    //   throw new Error('Email already exist');
    // }
    return of([]);
  }
}
