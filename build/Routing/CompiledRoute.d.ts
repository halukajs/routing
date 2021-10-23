/**
 * @name CompiledRoute
 * @author Robin Panta <hacktivistic@gmail.com>
 */
import { DispatcherOptions, KeyValue, METHOD } from './RoutingEssentials';
import Route from './Route';
export default class CompiledRoute {
    uri: string;
    methods: METHOD[];
    name: string;
    compiledAction: CallableFunction;
    middlewares: any[];
    conditions: KeyValue;
    constructor(uri: string, methods: METHOD[], name: string, middlewares: any[], compiledAction: CallableFunction, conditions: KeyValue);
    static FromRoute(route: Route, compilerOptions: DispatcherOptions): CompiledRoute;
}
