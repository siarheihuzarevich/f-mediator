import { Injectable } from "@nestjs/common";
import { Module } from "@nestjs/core/injector/module";
import { ModulesContainer } from "@nestjs/core/injector/modules-container";
import { EXECUTABLE_METADATA, VALIDATOR_METADATA } from "../";
import { Pipeline } from "./pipeline";

@Injectable()
export class MediatorSetupService {

  constructor(
    private readonly modulesContainer: ModulesContainer,
  ) {
  }

  public getPipelines() {
    const result = new Map<string, Pipeline>();

    const modules = [ ...this.modulesContainer.values() ];

    const { executables, validators } = this.getHandlers(modules);

    executables.forEach(executable => {
      const requestName = this.getRequestName(executable);
      const validator = validators.find(v => this.getRequestName(v) === requestName);
      const pipeline = new Pipeline(validator, executable);
      result.set(requestName, pipeline);
    });

    return result;
  }

  private getHandlers(modules: Module[]) {
    let executables = [];
    let validators = [];
    modules.forEach(module => {
      [ ...module.providers.values() ].forEach(provider => {
        const executable = this.extractMetadata(provider.instance, EXECUTABLE_METADATA);
        if (executable) {
          executables.push(provider.instance);
        }
        const validator = this.extractMetadata(provider.instance, VALIDATOR_METADATA);
        if (validator) {
          validators.push(provider.instance);
        }
      });
    });
    return { executables, validators };
  }

  private getRequestName(handler: Record<string, any>): string | undefined {
    const metadata = Reflect.getMetadata(EXECUTABLE_METADATA, handler.constructor)
      || Reflect.getMetadata(VALIDATOR_METADATA, handler.constructor);
    return metadata?.name;
  }

  private extractMetadata(instance: Record<string, any>, metadataKey: string) {
    if (!instance || !instance.constructor) {
      return undefined;
    }
    return Reflect.getMetadata(metadataKey, instance.constructor);
  }
}
