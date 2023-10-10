import { Component, OnInit } from '@angular/core';
import { DataContext } from './data-context/data-context';
import { CreateUserRequest } from './domain/user/create/create-user.request';
import { take } from 'rxjs';
import { FMediator } from 'f-mediator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {

  constructor(
    private dataContext: DataContext,
    // private d: CreateUserRequestHandler,
    // private v: CreateUserValidator,
    private mediator: FMediator
  ) {
  }

  public ngOnInit(): void {
    this.mediator.send(new CreateUserRequest('user1', 'user1@test.com')).pipe(take(1)).subscribe((result) => {
      console.log(result);
    });
  }
}
