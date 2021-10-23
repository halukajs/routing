/**
 * @name RouteCollection
 * @author Robin Panta <hacktivistic@gmail.com>
 */
import Route from './Route';
export default class RouteCollection {
    #private;
    add(route: Route): Route;
    clear(): void;
    getByName(name: string): any;
    getRoutes(): Route[];
    refreshNames(): void;
}
