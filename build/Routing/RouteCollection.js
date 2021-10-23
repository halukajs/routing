'use strict';
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _RouteCollection_routes, _RouteCollection_namedRoutes;
Object.defineProperty(exports, "__esModule", { value: true });
class RouteCollection {
    constructor() {
        _RouteCollection_routes.set(this, []);
        _RouteCollection_namedRoutes.set(this, []);
    }
    add(route) {
        __classPrivateFieldGet(this, _RouteCollection_routes, "f").push(route);
        return route;
    }
    clear() {
        __classPrivateFieldSet(this, _RouteCollection_routes, [], "f");
        __classPrivateFieldSet(this, _RouteCollection_namedRoutes, [], "f");
    }
    getByName(name) {
        return __classPrivateFieldGet(this, _RouteCollection_namedRoutes, "f")[name];
    }
    getRoutes() {
        return __classPrivateFieldGet(this, _RouteCollection_routes, "f");
    }
    refreshNames() {
        __classPrivateFieldSet(this, _RouteCollection_namedRoutes, [], "f");
        __classPrivateFieldGet(this, _RouteCollection_routes, "f").forEach(x => {
            if (x.getName())
                __classPrivateFieldGet(this, _RouteCollection_namedRoutes, "f")[x.getName()] = x;
        });
    }
}
exports.default = RouteCollection;
_RouteCollection_routes = new WeakMap(), _RouteCollection_namedRoutes = new WeakMap();
//# sourceMappingURL=RouteCollection.js.map