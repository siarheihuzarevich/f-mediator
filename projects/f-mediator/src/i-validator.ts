import { IHandler } from './i-handler';
import { IPipelineContext } from './i-pipeline-context';

export interface IValidator<TRequest, TContext = any>
  extends IHandler<TRequest, void | IPipelineContext<TContext>> {
}
