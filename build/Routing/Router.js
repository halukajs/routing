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
var _Router_opts, _Router_routes, _Router_groupStack;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name Router
 * @author Robin Panta <hacktivistic@gmail.com>
 */
const path = require("path");
const _ = require("lodash");
const RouteCollection_1 = require("./RouteCollection");
const Route_1 = require("./Route");
class Router {
    constructor(options) {
        _Router_opts.set(this, { path: '', });
        _Router_routes.set(this, new RouteCollection_1.default());
        _Router_groupStack.set(this, []);
        if (options)
            __classPrivateFieldSet(this, _Router_opts, options, "f");
    }
    get(uri, action) {
        return this.route('GET', uri, action);
    }
    post(uri, action) {
        return this.route('POST', uri, action);
    }
    put(uri, action) {
        return this.route('PUT', uri, action);
    }
    patch(uri, action) {
        return this.route('PATCH', uri, action);
    }
    delete(uri, action) {
        return this.route('DELETE', uri, action);
    }
    options(uri, action) {
        return this.route('OPTIONS', uri, action);
    }
    any(uri, action) {
        return this.route(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], uri, action);
    }
    route(methods, uri, action) {
        return __classPrivateFieldGet(this, _Router_routes, "f").add(this.createRoute(methods, uri, action));
    }
    group(attributes, routes) {
        __classPrivateFieldGet(this, _Router_groupStack, "f").push(attributes);
        this.loadRoutes(routes);
        __classPrivateFieldGet(this, _Router_groupStack, "f").pop();
    }
    flush() {
        __classPrivateFieldGet(this, _Router_routes, "f").clear();
    }
    loadRoutes(routes) {
        if (routes instanceof Function) {
            routes(this);
            // this.#groupStack.pop()
        }
        else if (typeof (routes) === 'string') {
            const _routes = routes;
            // eslint-disable-next-line
            const route = require(path.join(__classPrivateFieldGet(this, _Router_opts, "f").path, _routes)).Route;
            // if (route == undefined) // either a broken route file or a singleton router
            //throw new Error(`Route file needs to export a valid Router. '${typeof(route)}' exported.`)
            __classPrivateFieldGet(this, _Router_routes, "f").getRoutes().push(...__classPrivateFieldGet(route, _Router_routes, "f").getRoutes().map(x => this.mergeGroupAttributes(x)));
        }
        else {
            __classPrivateFieldGet(this, _Router_groupStack, "f").pop();
            throw new TypeError('Invalid Group Action provided. Exprected "string" or "function".');
        }
    }
    createRoute(methods, uri, action) {
        methods = (typeof (methods) === 'string' ? [methods] : methods);
        const route = new Route_1.default(methods, uri, action);
        if (__classPrivateFieldGet(this, _Router_groupStack, "f").length > 0) {
            this.mergeGroupAttributes(route);
        }
        return route;
    }
    mergeGroupAttributes(route) {
        let prefix = route.attribs.prefix || '';
        __classPrivateFieldGet(this, _Router_groupStack, "f").slice(0).reverse().forEach(lastGroup => {
            prefix = `${_.trimStart(lastGroup['prefix'], '/')}/${prefix}`;
        });
        route.attribs.prefix = _.trim(prefix, '/');
        return route;
    }
    get routes() {
        return __classPrivateFieldGet(this, _Router_routes, "f").getRoutes();
    }
    getRouteByName(name) {
        return __classPrivateFieldGet(this, _Router_routes, "f").getByName(name);
    }
    refresh() {
        __classPrivateFieldGet(this, _Router_routes, "f").refreshNames();
    }
}
exports.default = Router;
_Router_opts = new WeakMap(), _Router_routes = new WeakMap(), _Router_groupStack = new WeakMap();
//# sourceMappingURL=Router.js.map