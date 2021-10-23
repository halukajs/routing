'use strict'

/**
 * @name RouteCollection
 * @author Robin Panta <hacktivistic@gmail.com>
 */

import Route from './Route'

export default class RouteCollection {

	#routes: Route[] = []
	#namedRoutes: Route[] = []

	add (route: Route) {
		this.#routes.push(route)
		return route
	}

	clear () {
		this.#routes = []
		this.#namedRoutes = []
	}

	getByName (name: string) {
		return this.#namedRoutes[name]
	}

	getRoutes () {
		return this.#routes
	}

	refreshNames () {
		this.#namedRoutes = []

		this.#routes.forEach(x => {
			if (x.getName()) 
				this.#namedRoutes[x.getName()] = x
		})
	}

}