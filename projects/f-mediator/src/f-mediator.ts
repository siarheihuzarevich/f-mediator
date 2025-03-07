import { Injectable, Injector, Type } from '@angular/core';
import { IExecution } from './i-execution';
import { IValidator } from './i-validator';
import { Pipeline } from './pipeline';

@Injectable()
export class FMediator {

  constructor(
    private injector: Injector,
  ) {
  }

  public static pipelines = new Map<string, Pipeline<any, any>>();

  public static registerPipeline<TRequest, TResponse>(
    type: Type<TRequest>,
    handler: Type<IValidator<TRequest>> | Type<IExecution<TRequest, TResponse>>,
    isValidator: boolean
  ): void {
    const pipeline = this.pipelines.get(type.name) || new Pipeline<TRequest, TResponse>();
    isValidator
      ? pipeline.setValidator(handler as Type<IValidator<TRequest>>)
      : pipeline.setExecution(handler as Type<IExecution<TRequest, TResponse>>);

    this.pipelines.set(type.name, pipeline);
  }

  public send<TResponse>(request: any): TResponse {
    const pipeline = FMediator.pipelines.get(request.constructor.name);
    if (pipeline) {
      return pipeline.handle(request, this.injector);
    }

    throw new Error('Handler not registered for request type.');
  }

  // run pipeline without validation and error handling
  public execute<TResponse>(request: any): TResponse {
    return FMediator.pipelines.get(request.constructor.name)!.execute(request, this.injector);
  }
}
