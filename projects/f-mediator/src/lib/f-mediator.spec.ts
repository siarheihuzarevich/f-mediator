import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FMediator, FMediatorModule, IFValidator, IFQueryHandler, IFRequest } from './index';
import { Observable, of, throwError } from 'rxjs';
import { Type } from '@angular/core';
import { catchError } from 'rxjs/operators';

class ValidationFailure extends Error {
}

class HandlerFailure extends Error {
}

class MockRequest implements IFRequest<string> {
}

// Validators
class SuccessValidator implements IFValidator<MockRequest, string> {
  validate(request: MockRequest): Observable<Error[]> {
    return of([]);
  }
}

class FailureValidator implements IFValidator<MockRequest, string> {
  validate(request: MockRequest): Observable<Error[]> {
    return of([ new ValidationFailure('Validation Error') ]);
  }
}

// Handlers
class SuccessHandler implements IFQueryHandler<MockRequest, string> {
  handle(request: MockRequest): Observable<string> {
    return of('Success');
  }
}

class FailureHandler implements IFQueryHandler<MockRequest, string> {
  handle(request: MockRequest): Observable<string> {
    return throwError(() => new HandlerFailure('Handler Error'));
  }
}

describe('FMediator', () => {
  let mediator: FMediator;

  function setupModule(validator: Type<IFValidator<MockRequest, string>>, handler: Type<IFQueryHandler<MockRequest, string>>) {
    TestBed.configureTestingModule({
      imports: [ FMediatorModule.forRoot(), FMediatorModule.forFeature(MockRequest, validator, handler) ]
    });
    mediator = TestBed.inject(FMediator);
  }

  it('should return success when there are no errors', fakeAsync(() => {
    setupModule(SuccessValidator, SuccessHandler);
    mediator.send(new MockRequest()).subscribe(response => {
      expect(response).toEqual('Success');
    });
    tick();
  }));

  it('should return validation error when validator fails', fakeAsync(() => {
    setupModule(FailureValidator, SuccessHandler);
    mediator.send(new MockRequest()).pipe(catchError((err, o) => {
      expect(err).toEqual([ new ValidationFailure('Validation Error') ]);
      return o;
    })).subscribe();
    tick();
  }));
});
