"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class IoC {
    constructor() {
        this.instances = new Map();
    }
    instance(dep) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.instances.has(dep)) {
                return this.instances.get(dep);
            }
            if (typeof dep === 'symbol') {
                throw new Error(`Instance for symbol "${dep}" not registered.`);
            }
            if ('provide' in dep) {
                let instance = yield dep.provide(this);
                this.instances.set(dep, instance);
                return instance;
            }
            if ('name' in dep) {
                throw new Error(`Instance for object "${dep.name}" not provided.`);
            }
            throw new Error(`Instance for object "${dep.toString()}" not provided.`);
        });
    }
    register(key, instance) {
        this.instances.set(key, instance);
    }
}
exports.IoC = IoC;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IoC;
//# sourceMappingURL=index.js.map