'use strict'

/**
 * @name RouterDispatcher
 * @author Robin Panta <hacktivistic@gmail.com>
 */

import CompiledRoute from './CompiledRoute'
import Router from './Router'
import { DispatcherOptions } from './RoutingEssentials'


export default class RouterDispatcher<T> {
	protected router: Router
	protected options: DispatcherOptions

	constructor (router: Router, opts: DispatcherOptions) {
		this.router = router
		this.options = opts
	}

	*load () {
		for (const route of this.router.routes) { 
			yield CompiledRoute.FromRoute(route, this.options)
		}
	}

	/* istanbul ignore next */
	create (): T {
		throw new TypeError('create() not implemented.')
	}

	/* istanbul ignore next */     
	dispatch (_instance: T, timeout?: Number): T {
		throw new TypeError('dispatch() not implemented.')
	}
    
	/* istanbul ignore next */ 
	createAndDispatch (timeout?: Number): T {
		const app = this.create()
		return this.dispatch(app, timeout)
	}
}

