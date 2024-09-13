export interface IHandler<TRequest = void, TResponse = void> {

  handle(request?: TRequest, ...args: any): TResponse;
}
