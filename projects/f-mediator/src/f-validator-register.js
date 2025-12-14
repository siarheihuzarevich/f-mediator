"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FValidatorRegister = void 0;
const f_mediator_1 = require("./f-mediator");
function FValidatorRegister(requestType) {
    return function (constructor) {
        f_mediator_1.FMediator.registerPipeline(requestType, constructor, true);
    };
}
exports.FValidatorRegister = FValidatorRegister;
