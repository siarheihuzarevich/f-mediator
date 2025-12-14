import { ICommand } from './i-command';
import { IHandler } from './i-handler';
import { IPipelineContext } from './i-pipeline-context';

export interface ICommandHandler<TCommand extends ICommand, TResponse = void, TContext = any>
  extends IHandler<TCommand, TResponse> {
  handle(command: TCommand, context?: IPipelineContext<TContext>): TResponse;
}
