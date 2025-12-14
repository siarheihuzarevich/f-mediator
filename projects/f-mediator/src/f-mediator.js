"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FMediator_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FMediator = void 0;
const core_1 = require("@angular/core");
const pipeline_1 = require("./pipeline");
let FMediator = FMediator_1 = class FMediator {
    constructor() {
        this._injector = core_1.inject(core_1.Injector);
    }
    static registerPipeline(type, handler, isValidator) {
        if (!type || !type.fToken) {
            throw new Error('Type must have a fToken static property.');
        }
        const pipeline = this.pipelines.get(type.fToken) || new pipeline_1.Pipeline();
        isValidator
            ? pipeline.setValidator(handler)
            : pipeline.setExecution(handler);
        this.pipelines.set(type.fToken, pipeline);
    }
    send(request) {
        const pipeline = FMediator_1.pipelines.get(request.constructor.fToken);
        if (pipeline) {
            return pipeline.handle(request, this._injector);
        }
        throw new Error('Handler not registered for request type.');
    }
    sendCommand(command) {
        var _a;
        if (!((_a = command.constructor) === null || _a === void 0 ? void 0 : _a.fToken)) {
            throw new Error('Command must have a fToken static property on its constructor.');
        }
        return this.send(command);
    }
    sendQuery(query) {
        var _a;
        if (!((_a = query.constructor) === null || _a === void 0 ? void 0 : _a.fToken)) {
            throw new Error('Query must have a fToken static property on its constructor.');
        }
        return this.send(query);
    }
    // run pipeline without validation and error handling
    execute(request) {
        return FMediator_1.pipelines.get(request.constructor.fToken).execute(request, this._injector);
    }
};
FMediator.pipelines = new Map();
FMediator = FMediator_1 = __decorate([
    core_1.Injectable()
], FMediator);
exports.FMediator = FMediator;
