'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
class Route {
    constructor(methods, uri, action) {
        this.middlewares = [];
        this.methods = methods;
        this._uri = uri;
        this.action = action;
        this.attribs = { prefix: '' };
    }
    prefix(prefix) {
        const newPrefix = _.trim(_.trimEnd(this.attribs.prefix, '/') + '/' + _.trimStart(prefix, '/'), '/');
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
        return '/' + _.trim(`${this.attribs.prefix}/${_.trimStart(this._uri, '/')}`, '/');
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
//# sourceMappingURL=Route.js.map