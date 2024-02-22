import { Injectable, Type } from "@nestjs/common";
import { Pipeline } from "./mediator/pipeline";
import { IRequest } from "./mediator";

/**
 * The `FMediator` class serves as a central mediator within the application,
 * facilitating the handling of requests through a pipeline mechanism. It allows
 * for the registration of pipelines associated with specific request types
 * and the dispatching of requests to their respective handlers.
 */
@Injectable()
export class FMediator {

  private pipelines = new Map<string, Pipeline<any, any>>();

  public registerPipeline(name: string, pipeline: Pipeline<any, any>) {
    this.pipelines.set(name, pipeline);
  }

  public async send<T extends IRequest<R>, R>(request: Type, payload: T): Promise<R> {

    const requestName = request.name;

    const pipeline = this.pipelines.get(requestName);
    if (!pipeline) {
      throw new Error(`No handler found for ${ requestName }`);
    }

    return pipeline.execute(payload);
  }
}
