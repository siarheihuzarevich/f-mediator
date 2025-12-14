# Angular Mediator

An Angular library that implements the mediator pattern, providing a centralized way to handle requests with optional
validation and execution pipelines.

## Overview

The Angular Flow Mediator library allows you to streamline request handling in your Angular applications by:

- Centralizing request processing logic.
- Separating validation and execution concerns.
- Simplifying the addition of new request types.

By using decorators, you can easily register validators and execution handlers for specific request types, promoting
clean code organization and modularity.

## Installation

Install the library via npm:

```bash
  npm install @foblex/mediator
```
## Usage

### 1. Define a Request Type

Create a class representing your request:

```typescript
export class MyRequest {
  static readonly fToken = Symbol('MyRequest');
  constructor(public payload: any) {}
}
```

### 2. Create a Validator (Optional)

Implement a validator by extending IValidator and using the FValidatorRegister decorator:
    
```typescript
import { Injectable } from '@angular/core';
import { IValidator, FValidatorRegister } from 'angular-flow-mediator';
import { MyRequest } from './my-request';

@Injectable()
@FValidatorRegister(MyRequest)
export class MyRequestValidator implements IValidator<MyRequest> {
  handle(request: MyRequest): boolean {
    // Implement validation logic
    return request.payload !== null; // Return true if valid, false otherwise
  }
}
```

### 3. Create an Execution Handler

Implement an execution handler by extending IExecution and using the FExecutionRegister decorator:

```typescript
import { Injectable } from '@angular/core';
import { IExecution, FExecutionRegister } from 'angular-flow-mediator';
import { MyRequest } from './my-request';

@Injectable()
@FExecutionRegister(MyRequest)
export class MyRequestHandler implements IExecution<MyRequest, any> {
  handle(request: MyRequest): any {
    // Implement execution logic
    return `Processed payload: ${request.payload}`;
  }
}
```

### 4. Provide Handlers in Module

Ensure that you provide your handlers in your Angular module:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { FMediator } from '@foblex/mediator';
import { MyRequestValidator } from './my-request.validator';
import { MyRequestHandler } from './my-request.handler';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [
    FMediator,
    MyRequestValidator,
    MyRequestHandler
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 5. Use the Mediator
Inject FMediator into your component or service, and send requests:

```typescript
import { Component } from '@angular/core';
import { FMediator } from '@foblex/mediator';
import { MyRequest } from './my-request';

@Component({
  selector: 'app-root',
  template: `<h1>Angular Mediator Example</h1>`
})
export class AppComponent {
  constructor(private mediator: FMediator) {
    const response = this.mediator.send(new MyRequest('Sample Data'));
    console.log(response);
  }
}
```

## Advanced Features

### CQRS Pattern

The library supports full CQRS (Command Query Responsibility Segregation) pattern with dedicated interfaces and decorators:

#### Commands

Commands represent actions that change state:

```typescript
import { Injectable } from '@angular/core';
import { ICommand, ICommandHandler, FCommandHandlerRegister } from '@foblex/mediator';

export class CreateUserCommand implements ICommand {
  static readonly fToken = Symbol('CreateUserCommand');
  constructor(public username: string, public email: string) {}
}

@Injectable()
@FCommandHandlerRegister(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand, string> {
  handle(command: CreateUserCommand, context?: IPipelineContext<any>): string {
    // Create user logic
    return 'user-id-123';
  }
}

// Usage
const userId = this.mediator.send<string>(new CreateUserCommand('john', 'john@example.com'));
```

#### Queries

Queries represent read operations that return data:

```typescript
import { Injectable } from '@angular/core';
import { IQuery, IQueryHandler, FQueryHandlerRegister } from '@foblex/mediator';

export class GetUserQuery implements IQuery<UserDto> {
  static readonly fToken = Symbol('GetUserQuery');
  constructor(public userId: string) {}
}

export interface UserDto {
  id: string;
  username: string;
  email: string;
}

@Injectable()
@FQueryHandlerRegister(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery, UserDto> {
  handle(query: GetUserQuery, context?: IPipelineContext<any>): UserDto {
    // Fetch user logic
    return { id: query.userId, username: 'john', email: 'john@example.com' };
  }
}

// Usage
const user = this.mediator.send<UserDto>(new GetUserQuery('user-id-123'));
```

### Pipeline Context Sharing

Validators can compute data and share it with execution handlers through a typed context. This avoids duplicate computations:

```typescript
import { Injectable } from '@angular/core';
import { 
  ICommand, 
  ICommandHandler, 
  IValidator, 
  IPipelineContext,
  FCommandHandlerRegister,
  FValidatorRegister 
} from '@foblex/mediator';

export class ProcessDataCommand implements ICommand {
  static readonly fToken = Symbol('ProcessDataCommand');
  constructor(public rawData: string) {}
}

// Validator computes and shares normalized data
@Injectable()
@FValidatorRegister(ProcessDataCommand)
export class ProcessDataValidator implements IValidator<ProcessDataCommand, { normalizedData: string }> {
  handle(command: ProcessDataCommand): IPipelineContext<{ normalizedData: string }> {
    // Perform expensive computation once
    const normalizedData = command.rawData.toLowerCase().trim();
    
    // Return context with computed data
    return {
      data: { normalizedData }
    };
  }
}

// Handler receives and uses the computed context
@Injectable()
@FCommandHandlerRegister(ProcessDataCommand)
export class ProcessDataHandler implements ICommandHandler<ProcessDataCommand, void> {
  handle(command: ProcessDataCommand, context?: IPipelineContext<{ normalizedData: string }>): void {
    // Use the normalized data from validator
    const data = context?.data.normalizedData || command.rawData;
    console.log(`Processing: ${data}`);
  }
}
```

### Backward Compatibility & Migration

#### Validators
Validators maintain full backward compatibility and can still return simple boolean values:

```typescript
@Injectable()
@FValidatorRegister(MyRequest)
export class MyRequestValidator implements IValidator<MyRequest> {
  handle(request: MyRequest): boolean {
    return request.payload !== null; // Simple boolean validation
  }
}
```

#### Execution Handlers
**Note**: Execution handlers now receive an optional second parameter `context`. Existing implementations need to update their signature:

**Before:**
```typescript
@Injectable()
@FExecutionRegister(MyRequest)
export class MyRequestHandler implements IExecution<MyRequest, any> {
  handle(request: MyRequest): any {
    return `Processed: ${request.payload}`;
  }
}
```

**After (Migration):**
```typescript
@Injectable()
@FExecutionRegister(MyRequest)
export class MyRequestHandler implements IExecution<MyRequest, any> {
  handle(request: MyRequest, context?: IPipelineContext<any>): any {
    // context parameter is optional, can be ignored if not needed
    return `Processed: ${request.payload}`;
  }
}
```

## API Reference

### Core Interfaces

- **ICommand**: Marker interface for commands
- **IQuery<TResponse>**: Marker interface for queries with response type
- **ICommandHandler<TCommand, TResponse>**: Handler for commands
- **IQueryHandler<TQuery, TResponse>**: Handler for queries
- **IValidator<TRequest, TContext>**: Validator with optional context output
- **IExecution<TRequest, TResponse, TContext>**: Execution handler with optional context input
- **IPipelineContext<TContext>**: Container for shared context data

### Decorators

- **@FCommandHandlerRegister(commandType)**: Register a command handler
- **@FQueryHandlerRegister(queryType)**: Register a query handler
- **@FValidatorRegister(requestType)**: Register a validator
- **@FExecutionRegister(requestType)**: Register an execution handler

### FMediator Methods

- **send<TResponse>(request: any): TResponse**: Send any request (commands, queries, or requests) through the pipeline with validation
- **execute<TResponse>(request: any): TResponse**: Execute request without validation

## License

This project is licensed under the MIT License.

By following this guide, you should be able to integrate the Angular Mediator into your application, enhancing your request handling mechanisms with a clean and efficient mediator pattern.
