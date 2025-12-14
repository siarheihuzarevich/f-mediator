"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FCommandHandlerRegister = void 0;
const f_mediator_1 = require("./f-mediator");
function FCommandHandlerRegister(commandType) {
    return function (constructor) {
        f_mediator_1.FMediator.registerPipeline(commandType, constructor, false);
    };
}
exports.FCommandHandlerRegister = FCommandHandlerRegister;
