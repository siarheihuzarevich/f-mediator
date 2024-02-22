import { IRequest } from "../mediator/i-request";

/**
 * Interface representing a Query in the CQRS pattern.
 * Queries are responsible for requesting data from the application without changing its state.
 * They typically result in data retrieval operations.
 */
export interface IQuery<TResponse> extends IRequest<TResponse> {
}
