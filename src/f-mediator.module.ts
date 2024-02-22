import { DynamicModule, Module, OnApplicationBootstrap } from "@nestjs/common";
import { FMediator } from "./f-mediator";
import { MediatorSetupService } from "./mediator/mediator-setup.service";

/**
 * `FMediatorModule` is a NestJS module that provides configuration for the FMediator service.
 * It is responsible for integrating the mediator service into the NestJS application, allowing
 * for the registration and discovery of command handlers, query handlers, and validators.
 */
@Module({
  providers: [
    FMediator,
    MediatorSetupService
  ],
  exports: [ FMediator ]
})
export class FMediatorModule implements OnApplicationBootstrap {

  static forRoot(): DynamicModule {
    return {
      module: FMediatorModule,
      global: true
    };
  }

  /**
   * Creates an instance of FMediatorModule.
   * @param {MediatorSetupService} setupService - The service used for setup pipelines.
   * @param {FMediator} mediator - The mediator service used for handling requests.
   */
  constructor(
    private readonly setupService: MediatorSetupService,
    private readonly mediator: FMediator
  ) {
  }

  public onApplicationBootstrap() {
    const pipelines = this.setupService.getPipelines();

    pipelines.forEach((pipeline, name) => {
      this.mediator.registerPipeline(name, pipeline);
    });
  }
}
