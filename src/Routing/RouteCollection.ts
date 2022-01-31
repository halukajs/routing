'use strict'

/**
 * @name RouteCollection
 * @author Robin Panta <hacktivistic@gmail.com>
 */

import Route from './Route'

export default class RouteCollection {

	private _routes: Route[] = []
	private _namedRoutes: Route[] = []

	add (route: Route) {
		this._routes.push(route)
		return route
	}

	clear () {
		this._routes = []
		this._namedRoutes = []
	}

	getByName (name: string) {
		return this._namedRoutes[name]
	}

	getRoutes () {
		return this._routes
	}

	refreshNames () {
		this._namedRoutes = []

		this._routes.forEach(x => {
			if (x.getName()) 
				this._namedRoutes[x.getName()] = x
		})
	}

}