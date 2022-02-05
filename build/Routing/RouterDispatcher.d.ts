/**
 * @name RouterDispatcher
 * @author Robin Panta <hacktivistic@gmail.com>
 */
import CompiledRoute from './CompiledRoute';
import Router from './Router';
import { DispatcherOptions } from './RoutingEssentials';
export default class RouterDispatcher<T> {
    protected router: Router;
    protected options: DispatcherOptions;
    constructor(router: Router, opts: DispatcherOptions);
    load(): Generator<CompiledRoute, void, unknown>;
    create(): T;
    dispatch(_instance: T, timeout?: Number): T;
    createAndDispatch(timeout?: Number): T;
}
