import {inject, Injectable, Injector, Type} from '@angular/core';
import { IExecution } from './i-execution';
import { IValidator } from './i-validator';
import { Pipeline } from './pipeline';
import { ICommand } from './i-command';
import { IQuery } from './i-query';

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

  public sendCommand<TResponse = void>(command: ICommand): TResponse {
    if (!(command as any).constructor?.fToken) {
      throw new Error('Command must have a fToken static property on its constructor.');
    }
    return this.send<TResponse>(command);
  }

  public sendQuery<TResponse>(query: IQuery<TResponse>): TResponse {
    if (!(query as any).constructor?.fToken) {
      throw new Error('Query must have a fToken static property on its constructor.');
    }
    return this.send<TResponse>(query);
  }

  // run pipeline without validation and error handling
  public execute<TResponse>(request: any): TResponse {
    return FMediator.pipelines.get(request.constructor.fToken)!.execute(request, this._injector);
  }
}
