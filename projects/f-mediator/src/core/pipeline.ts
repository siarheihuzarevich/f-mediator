import { IValidator } from '../interfaces/i-validator';
import { IExecution } from '../interfaces/i-execution';
import { Injector, Type } from '@angular/core';
import { IHandler } from '../interfaces/i-handler';
import { IPipelineContext } from '../interfaces/i-pipeline-context';
import { ValidationSkipError } from '../errors/validation-skip-error';

export class Pipeline<TRequest, TResponse, TContext = any>
  implements IHandler<TRequest, TResponse | void> {

  private validator?: Type<IValidator<TRequest, TContext>>;
  private execution!: Type<IExecution<TRequest, TResponse, TContext>>;

  public handle(request: TRequest, injector: Injector): TResponse | void {
    let context: IPipelineContext<TContext> | undefined;
    
    if (this.validator) {
      try {
        const validationResult = injector.get(this.validator).handle(request);
        
        if (validationResult !== undefined && validationResult !== null) {
          context = validationResult;
        }
      } catch (error) {
        if (error instanceof ValidationSkipError) {
          // Not an error, just skip execution
          return;
        }
        // Re-throw other errors (including ValidationError)
        throw error;
      }
    }

    return injector.get(this.execution).handle(request, context);
  }

  public execute(request: TRequest, injector: Injector): TResponse | void {
    return injector.get(this.execution).handle(request, undefined);
  }

  public setValidator(validator: Type<IValidator<TRequest, TContext>>): void {
    this.validator = validator;
  }

  public setExecution(execution: Type<IExecution<TRequest, TResponse, TContext>>): void {
    this.execution = execution;
  }
}
