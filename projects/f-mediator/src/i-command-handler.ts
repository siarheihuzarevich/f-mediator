import { ICommand } from './i-command';
import { IHandler } from './i-handler';

export interface ICommandHandler<TCommand extends ICommand, TResponse = void>
  extends IHandler<TCommand, TResponse> {
}
