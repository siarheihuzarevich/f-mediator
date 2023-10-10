import { IIdNameModel } from '../../i-id-name-model';

export class CreateUserResponse implements IIdNameModel {

  constructor(
    public id: number,
    public name: string
  ) {

  }
}
