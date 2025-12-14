import {inject, Injectable, Injector, Type} from '@angular/core';
import { IExecution } from '../interfaces/i-execution';
import { IValidator } from '../interfaces/i-validator';
import { Pipeline } from './pipeline';
import { ICommand } from '../interfaces/i-command';
import { IQuery } from '../interfaces/i-query';

@Injectable()
export class FMediator {

  private readonly _injector = inject(Injector);

  public static pipelines = new Map<string, Pipeline<any, any, any>>();

  public static registerPipeline<TRequest, TResponse, TContext = any>(
    type: any,
    handler: Type<IValidator<TRequest, TContext>> | Type<IExecution<TRequest, TResponse, TContext>>,
    isValidator: boolean
  ): void {
    if (!type || !type.fToken) {
      throw new Error('Type must have a fToken static property.');
    }
    const pipeline = this.pipelines.get(type.fToken) || new Pipeline<TRequest, TResponse, TContext>();
    isValidator
      ? pipeline.setValidator(handler as Type<IValidator<TRequest, TContext>>)
      : pipeline.setExecution(handler as Type<IExecution<TRequest, TResponse, TContext>>);

    this.pipelines.set(type.fToken, pipeline);
  }

  public send<TResponse>(request: any): TResponse {
    const pipeline = FMediator.pipelines.get(request.constructor.fToken);
    if (pipeline) {
      return pipeline.handle(request, this._injector);
    }

    throw new Error('Handler not registered for request type.');
  }

  // run pipeline without validation and error handling
  public execute<TResponse>(request: any): TResponse {
    return FMediator.pipelines.get(request.constructor.fToken)!.execute(request, this._injector);
  }
}
