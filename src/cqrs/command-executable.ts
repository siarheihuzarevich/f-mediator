import { ICommand } from "./i-command";
import { IRequestHandler } from "../mediator/i-request-handler";

/**
 * Abstract class representing a command handler in the Command Query Responsibility Segregation (CQRS) pattern.
 * This class defines the basic structure for handling commands that change the state of the application.
 *
 * @template TRequest The command type this handler is responsible for.
 * @template TResponse The type of the response that the command produces.
 */
export abstract class CommandExecutable<TRequest extends ICommand<TResponse>, TResponse>
  implements IRequestHandler<TRequest, TResponse> {

  public async handle(request: TRequest): Promise<TResponse> {

    const result = await this.executeAsync(request);

    return result;
  }

  protected abstract executeAsync(request: TRequest): Promise<TResponse>;
}
