# @foblex/mediator

An advanced mediator library for NestJS, leveraging the Command Query Responsibility Segregation (CQRS) pattern to facilitate low coupling and high cohesion within applications. Designed to streamline the execution of commands and queries, @foblex/mediator supports a clean architecture by separating the responsibility of command execution and query handling.

## Features

- Implements CQRS pattern for clear separation of command and query operations.
- Facilitates low coupling and high cohesion for scalable application architecture.
- Easy integration with NestJS projects.

## Installation

Install the F-Mediator library via npm:

```bash
npm install @foblex/mediator
```

## Usage

FMediator simplifies the handling of commands and queries within your Angular applications, ensuring a clean and maintainable architecture. Below are the steps on how to utilize FMediator in your project:

**Setting up Validators and Handlers**

Create your request class implementing IRequest<TResponse> interface.

```typescript
export class CreateAccountRequest implements IRequest<void> {

  constructor(
      public emailAddress: string,
  ) {
  }
}
```

Create a validator implementing IRequestValidator<TRequest, TResponse> interface.

```typescript
@Validator(CreateAccountRequest)
export class CreateAccountHandler implements IRequestValidator<CreateAccountRequest, void> {

  constructor(
      @Inject(DATA_CONTEXT) private dataContext: IDataContext
  ) {
  }

  public async handle(payload: CreateAccountRequest): Promise<Error[]> {

    const user = await this.dataContext.find("Users", { emailAddress: payload.emailAddress });

    if (user) {
      return [ new Error("Email address already exists") ];
    }

    return [];
  }
}
```

Create handlers extending CommandExecutable class.

```typescript
@Executable(CreateAccountRequest)
export class CreateAccountHandler extends CommandExecutable<CreateAccountRequest, void> {

  constructor(
      @Inject(DATA_CONTEXT) private dataContext: IDataContext
  ) {
    super();
  }

  public async executeAsync(payload: CreateAccountRequest): Promise<void> {

    this.dataContext.create('Users', { emailAddress: payload.emailAddress });
  }
}
```

**Configuring FMediatorModule**

In your app module, import FMediatorModule and configure it using forRoot method.

```typescript
@Module({
  imports: [
    FMediatorModule.forRoot(),
  ]
})
export class AppModule {
}
```

**Using F-Mediator Service**

Inject FMediator service and use send method to send your requests.

```typescript
@Controller("account")
export class AccountController {

  constructor(
      private mediator: FMediator
  ) {
  }

  @Post()
  public async create(@Body() payload: CreateAccountRequest) {
    return this.mediator.send(CreateAccountRequest, payload);
  }
}
```
