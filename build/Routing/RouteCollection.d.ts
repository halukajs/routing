/**
 * @name RouteCollection
 * @author Robin Panta <hacktivistic@gmail.com>
 */
import Route from './Route';
export default class RouteCollection {
    private _routes;
    private _namedRoutes;
    add(route: Route): Route;
    clear(): void;
    getByName(name: string): any;
    getRoutes(): Route[];
    refreshNames(): void;
}
