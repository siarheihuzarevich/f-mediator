"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FQueryHandlerRegister = void 0;
const f_mediator_1 = require("./f-mediator");
function FQueryHandlerRegister(queryType) {
    return function (constructor) {
        f_mediator_1.FMediator.registerPipeline(queryType, constructor, false);
    };
}
exports.FQueryHandlerRegister = FQueryHandlerRegister;
