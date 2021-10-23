/**
 * @name Route
 * @author Robin Panta <hacktivistic@gmail.com>
 */
import { Action, KeyValue, METHOD, MiddlewareType, RouteAttributes } from './RoutingEssentials';
export default class Route {
    #private;
    methods: METHOD[];
    action: Action;
    attribs: RouteAttributes;
    middlewares: MiddlewareType[];
    constructor(methods: METHOD[], uri: string, action: Action);
    prefix(prefix: string): this;
    where(name: string | KeyValue, expression?: string): this;
    name(name: string): this;
    get uri(): string;
    middleware(...middleware: MiddlewareType[]): this;
    getName(): string;
}
