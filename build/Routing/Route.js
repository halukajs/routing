'use strict';
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Route_uri;
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
class Route {
    constructor(methods, uri, action) {
        _Route_uri.set(this, void 0);
        this.middlewares = [];
        this.methods = methods;
        __classPrivateFieldSet(this, _Route_uri, uri, "f");
        this.action = action;
        this.attribs = { prefix: '' };
    }
    prefix(prefix) {
        var newPrefix = _.trim(_.trimEnd(this.attribs.prefix, '/') + '/' + _.trimStart(prefix, '/'), '/');
        this.attribs.prefix = newPrefix;
        return this;
    }
    where(name, expression) {
        this.attribs.where = this.attribs.where || {};
        if (typeof (name) === 'string') {
            this.attribs.where[name] = expression;
        }
        else {
            _.merge(this.attribs.where, name);
        }
        return this;
    }
    name(name) {
        this.attribs.name = (this.getName() !== '') ? this.getName() : name;
        return this;
    }
    get uri() {
        return '/' + _.trim(`${this.attribs.prefix}/${_.trimStart(__classPrivateFieldGet(this, _Route_uri, "f"), '/')}`, '/');
    }
    middleware(...middleware) {
        middleware.forEach(x => {
            this.middlewares.push(x);
        });
        return this;
    }
    getName() {
        return this.attribs.name || '';
    }
}
exports.default = Route;
_Route_uri = new WeakMap();
//# sourceMappingURL=Route.js.map