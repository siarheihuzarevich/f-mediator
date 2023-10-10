# F-Mediator Library

FMediator is a mediator library for Angular that facilitates a clean architecture with a better command-query separation. It helps in orchestrating the handling of commands and queries in a simple, extendable, and maintainable manner.

## Installation

Install the F-Mediator library via npm:

```bash
npm install @foblex/mediator --save
```

## Usage

FMediator simplifies the handling of commands and queries within your Angular applications, ensuring a clean and maintainable architecture. Below are the steps on how to utilize FMediator in your project:

**Setting up Validators and Handlers**

Create your request class implementing IFRequest interface.

```typescript
class CreateUserResponse {
  constructor(
    public id: number,
    public fullName: string,
  ) {}
}

class CreateUserRequest implements IFRequest<CreateUserResponse> {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string
  ) {}
}
```

Create a validator implementing IFValidator interface.

```typescript
@Injectable({
  providedIn: 'root'
})
class CreateUserValidator implements IFValidator<CreateUserRequest, CreateUserResponse> {
  constructor(
    private dataContext: DataContext
  ) {
  }

  validate(request: CreateUserRequest): Observable<Error[]> {
    let result: Error[] = [];
    const user = this.dataContext.users.find(u => u.email === request.email);
    if (user) {
      result.push(new Error('User with the same email already exists.'));
    }
    return of(result);
  }
}
```

Create handlers implementing IFQueryHandler interface.

```typescript
@Injectable({
  providedIn: 'root'
})
class CreateUserHandler implements IFQueryHandler<CreateUserRequest, CreateUserResponse> {
  constructor(
    private dataContext: DataContext
  ) {
  }
  
  handle(request: CreateUserRequest): Observable<CreateUserResponse> {
    const user = new User(request.firstName, request.lastName, request.email);
    this.dataContext.users.push(user);
    return of(new CreateUserResponse(user.id, user.firstName + ' ' + user.lastName));
  }
}
```

**Configuring F-Mediator Module**

In your module, import FMediatorModule and configure it using forRoot and forFeature methods.

```typescript
import { FMediatorModule } from '@foblex/mediator';

@NgModule({
  imports: [
    FMediatorModule.forRoot(),
    FMediatorModule.forFeature(CreateUserRequest, CreateUserValidator, CreateUserHandler)
  ]
})
export class AppModule {}
```

**Using F-Mediator Service**

Inject FMediator service and use send method to send your requests.

```typescript
import { catchError } from 'rxjs/operators';

constructor(private mediator: FMediator) {
}

sendRequest(): void {
  this.mediator.send(new CreateUserRequest('test', 'test', 'test@test.com')).pipe(catchError((error, caught) => {
    console.log(error);
    return caught;
  })).subscribe(response => {
    console.log(response);
  });
}
```
