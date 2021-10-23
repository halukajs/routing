/**
 * @name CompiledRoute
 * @author Robin Panta <hacktivistic@gmail.com>
 */
import { DispatcherOptions, METHOD } from './RoutingEssentials';
import Route from './Route';
export default class CompiledRoute {
    uri: string;
    methods: METHOD[];
    name: string;
    compiledAction: Function;
    middlewares: any[];
    conditions: {};
    constructor(uri: string, methods: METHOD[], name: string, middlewares: any[], compiledAction: Function, conditions: {});
    static FromRoute(route: Route, compilerOptions: DispatcherOptions): CompiledRoute;
}
