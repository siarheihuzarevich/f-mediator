import "reflect-metadata";
import { IRequest } from "./i-request";

export const VALIDATOR_METADATA = '__VALIDATOR_METADATA__';

export function Validator<TResponse>(request: IRequest<TResponse>) {
  return (target: Object) => {
    Reflect.defineMetadata(VALIDATOR_METADATA, request, target);
  };
}
