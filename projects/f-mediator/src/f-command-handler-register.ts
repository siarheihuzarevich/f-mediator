import { Type } from '@angular/core';
import { FMediator } from './f-mediator';
import { ICommandHandler } from './i-command-handler';
import { ICommand } from './i-command';

type Constructor<T = any> = new (...args: any[]) => T;

export function FCommandHandlerRegister<TCommand extends ICommand, TResponse = void>(
  commandType: Type<TCommand>
) {
  return function (constructor: Constructor<ICommandHandler<TCommand, TResponse>>) {
    FMediator.registerPipeline(commandType, constructor, false);
  };
}
