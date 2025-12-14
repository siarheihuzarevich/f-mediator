import { Type } from '@angular/core';
import { FMediator } from '../core/f-mediator';
import { ICommandHandler } from '../interfaces/i-command-handler';
import { ICommand } from '../interfaces/i-command';

type Constructor<T = any> = new (...args: any[]) => T;

export function FCommandHandlerRegister<TCommand extends ICommand, TResponse = void>(
  commandType: Type<TCommand>
) {
  return function (constructor: Constructor<ICommandHandler<TCommand, TResponse>>) {
    FMediator.registerPipeline(commandType, constructor, false);
  };
}
