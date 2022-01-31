'use strict';
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
        this.opts = { path: '', };
        this._routes = new RouteCollection_1.default();
        this.groupStack = [];
        if (options)
            this.opts = options;
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
        return this._routes.add(this.createRoute(methods, uri, action));
    }
    group(attributes, routes) {
        this.groupStack.push(attributes);
        this.loadRoutes(routes);
        this.groupStack.pop();
    }
    flush() {
        this._routes.clear();
    }
    loadRoutes(routes) {
        if (routes instanceof Function) {
            routes(this);
            // this.#groupStack.pop()
        }
        else if (typeof (routes) === 'string') {
            const _routes = routes;
            // eslint-disable-next-line
            const route = require(path.join(this.opts.path, _routes)).Route;
            // if (route == undefined) // either a broken route file or a singleton router
            //throw new Error(`Route file needs to export a valid Router. '${typeof(route)}' exported.`)
            this._routes.getRoutes().push(...route._routes.getRoutes().map(x => this.mergeGroupAttributes(x)));
        }
        else {
            this.groupStack.pop();
            throw new TypeError('Invalid Group Action provided. Exprected "string" or "function".');
        }
    }
    createRoute(methods, uri, action) {
        methods = (typeof (methods) === 'string' ? [methods] : methods);
        const route = new Route_1.default(methods, uri, action);
        if (this.groupStack.length > 0) {
            this.mergeGroupAttributes(route);
        }
        return route;
    }
    mergeGroupAttributes(route) {
        let prefix = route.attribs.prefix || '';
        this.groupStack.slice(0).reverse().forEach(lastGroup => {
            prefix = `${_.trimStart(lastGroup['prefix'], '/')}/${prefix}`;
        });
        route.attribs.prefix = _.trim(prefix, '/');
        return route;
    }
    get routes() {
        return this._routes.getRoutes();
    }
    getRouteByName(name) {
        return this._routes.getByName(name);
    }
    refresh() {
        this._routes.refreshNames();
    }
}
exports.default = Router;
//# sourceMappingURL=Router.js.map