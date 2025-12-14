import { IValidator } from './i-validator';
import { IExecution } from './i-execution';
import { Injector, Type } from '@angular/core';
import { IHandler } from './i-handler';
import { IPipelineContext } from './i-pipeline-context';

export class Pipeline<TRequest, TResponse, TContext = any>
  implements IHandler<TRequest, TResponse | void> {

  private validator?: Type<IValidator<TRequest, TContext>>;
  private execution!: Type<IExecution<TRequest, TResponse, TContext>>;

  public handle(request: TRequest, injector: Injector): TResponse | void {
    let context: IPipelineContext<TContext> | undefined;
    
    if (this.validator) {
      const validationResult = injector.get(this.validator).handle(request);
      
      if (typeof validationResult === 'boolean') {
        if (!validationResult) {
          return;
        }
      } else {
        context = validationResult;
      }
    }

    return injector.get(this.execution).handle(request, context);
  }

  public execute(request: TRequest, injector: Injector): TResponse | void {
    return injector.get(this.execution).handle(request);
  }

  public setValidator(validator: Type<IValidator<TRequest, TContext>>): void {
    this.validator = validator;
  }

  public setExecution(execution: Type<IExecution<TRequest, TResponse, TContext>>): void {
    this.execution = execution;
  }
}
