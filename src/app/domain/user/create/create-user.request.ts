import { IFRequest } from 'f-mediator';
import { CreateUserResponse } from './create-user-response';

export class CreateUserRequest implements IFRequest<CreateUserResponse>{
  constructor(
    public name: string,
    public email: string
  ) {
  }
}
