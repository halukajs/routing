'use strict'

import { MiddlewareOptions } from '../Routing/RoutingEssentials'

/**
 * @name Middleware
 * @author Robin Panta <hacktivistic@gmail.com>
 */

export default class Middleware {
    
    /* istanbul ignore next */
	public handle (_opts: MiddlewareOptions) {
		throw new TypeError('Middleware handler not implemented.')
	}

}