import { CreateUserRequest } from './create-user.request';
import { CreateUserResponse } from './create-user-response';
import { Observable } from 'rxjs';
import { DataContext } from '../../../data-context/data-context';
import { IFQueryHandler } from 'f-mediator';
import { Injectable } from '@angular/core';

@Injectable()
export class CreateUserRequestHandler implements IFQueryHandler<CreateUserRequest, CreateUserResponse> {

  constructor(
    private dataContext: DataContext
  ) {
  }

  public handle(request: CreateUserRequest): Observable<CreateUserResponse> {
    const lastId = this.dataContext.getUsers().length ? this.dataContext.getUsers()[ this.dataContext.getUsers().length - 1 ].id : 0;

    const user = {
      id: lastId + 1,
      name: request.name,
      email: request.email
    };
    this.dataContext.getUsers().push(user);

    return new Observable<CreateUserResponse>(observer => {
      observer.next(new CreateUserResponse(user.id, user.name));
      observer.complete();
    });
  }
}
