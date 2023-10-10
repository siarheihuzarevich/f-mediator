import { Injectable } from '@angular/core';
import { IDataContextUser } from './i-data-context-user';

@Injectable({
  providedIn: 'root'
})
export class DataContext {

  private users: IDataContextUser[] = [];

  public setUsers(users: IDataContextUser[]): void {
    this.users = users;
  }

  public getUsers(): IDataContextUser[] {
    return this.users;
  }
}
