import { Action, METHOD, RouteAttributes, RouterOptions } from './RoutingEssentials';
import Route from './Route';
export default class Router {
    #private;
    constructor(options?: RouterOptions);
    get(uri: string, action: Action): Route;
    post(uri: string, action: Action): Route;
    put(uri: string, action: Action): Route;
    patch(uri: string, action: Action): Route;
    delete(uri: string, action: Action): Route;
    options(uri: string, action: Action): Route;
    any(uri: string, action: Action): Route;
    route(methods: METHOD | METHOD[], uri: string, action: Action): Route;
    group(attributes: RouteAttributes, routes: Action): void;
    flush(): void;
    protected loadRoutes(routes: Action): void;
    private createRoute;
    private mergeGroupAttributes;
    get routes(): Route[];
    getRouteByName(name: string): Route;
    refresh(): void;
}
