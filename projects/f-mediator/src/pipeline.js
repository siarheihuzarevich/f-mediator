"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pipeline = void 0;
class Pipeline {
    handle(request, injector) {
        let context;
        if (this.validator) {
            const validationResult = injector.get(this.validator).handle(request);
            if (typeof validationResult === 'boolean') {
                if (!validationResult) {
                    return;
                }
            }
            else {
                context = validationResult;
            }
        }
        return injector.get(this.execution).handle(request, context);
    }
    execute(request, injector) {
        return injector.get(this.execution).handle(request, undefined);
    }
    setValidator(validator) {
        this.validator = validator;
    }
    setExecution(execution) {
        this.execution = execution;
    }
}
exports.Pipeline = Pipeline;
