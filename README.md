# @foblex/nestjs-mediator

An advanced mediator library for NestJS, leveraging the Command Query Responsibility Segregation (CQRS) pattern to facilitate low coupling and high cohesion within applications. Designed to streamline the execution of commands and queries, @foblex/mediator supports a clean architecture by separating the responsibility of command execution and query handling.

For an example of how to use this library, check out this [Demo Project](https://github.com/siarheihuzarevich/f-nestjs-infrastructure-examples).

## Features

- Implements CQRS pattern for clear separation of command and query operations.
- Facilitates low coupling and high cohesion for scalable application architecture.
- Easy integration with NestJS projects.

## Installation

Install the @foblex/nestjs-mediator library via npm:

```bash
npm install @foblex/nestjs-mediator
```

## Usage

FMediator simplifies the handling of commands and queries within your Angular applications, ensuring a clean and maintainable architecture. Below are the steps on how to utilize FMediator in your project:

**Setting up Validators and Handlers**

Create your request class implementing IRequest<TResponse> interface.

```typescript
export class CreateProductRequest implements IRequest<void> {

  constructor(
      public name: string,
      public description: string,
      public price: number,
  ) {
  }
}
```

Create a validator implementing IRequestValidator<TRequest, TResponse> interface.

```typescript
@Validator(CreateProductRequest)
export class CreateProductValidator
    implements IRequestValidator<CreateProductRequest, void> {

  constructor(
      @InjectModel(Product.name) private dataContext: Model<Product>
  ) {
  }

  public async handle(payload: CreateProductRequest): Promise<void> {
    const errors: string[] = [];

    if (!payload.name) {
      errors.push("Name is required");
    }

    if (!payload.price) {
      errors.push("Price is required");
    }

    const product = await this.dataContext.findOne({ name: payload.name });
    if (product) {
      errors.push("Product already exists");
    }

    if (errors.length > 0) {
      throw new HttpException({ errors }, 400);
    }
  }
}
```

Create handlers extending CommandExecutable class.

```typescript
@Executable(CreateProductRequest)
export class CreateProductHandler
    extends CommandExecutable<CreateProductRequest, void> {

  constructor(
      @InjectModel(Product.name) private dataContext: Model<Product>
  ) {
    super();
  }

  public async executeAsync(payload: CreateProductRequest): Promise<void> {
    await this.dataContext.create({ ...payload, productId: uuid() });
  }
}
```

Add your validators and handlers to the module providers.

```typescript
@Module({
  providers: [ CreateProductValidator, CreateProductHandler ]
})
export class DomainModule {
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

**Using FMediator Service**

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

**License**

The code in this project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
