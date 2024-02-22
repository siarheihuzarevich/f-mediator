import "reflect-metadata";
import { IRequest } from "./i-request";

export const EXECUTABLE_METADATA = '__EXECUTABLE_METADATA__';

export function Executable<TResponse>(request: IRequest<TResponse>) {
  return (target: Object) => {
    Reflect.defineMetadata(EXECUTABLE_METADATA, request, target);
  };
}
