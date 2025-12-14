"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FExecutionRegister = void 0;
const f_mediator_1 = require("./f-mediator");
function FExecutionRegister(requestType) {
    return function (constructor) {
        f_mediator_1.FMediator.registerPipeline(requestType, constructor, false);
    };
}
exports.FExecutionRegister = FExecutionRegister;
