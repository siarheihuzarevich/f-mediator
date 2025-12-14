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

## License

This project is licensed under the MIT License.

By following this guide, you should be able to integrate the Angular Mediator into your application, enhancing your request handling mechanisms with a clean and efficient mediator pattern.
