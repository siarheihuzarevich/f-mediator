import { IRequest } from "../mediator/i-request";

/**
 * Interface representing a Command in the CQRS pattern.
 * Commands are responsible for requesting a change in the state of the application,
 * typically resulting in operations such as create, update, or delete.
 */
export interface ICommand<TResponse> extends IRequest<TResponse> {
}
