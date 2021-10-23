'use strict'

/**
 * @name Router
 * @author Robin Panta <hacktivistic@gmail.com>
 */

import * as path from 'path'
import * as _ from 'lodash'
import { Action, METHOD, RouteAttributes, RouterOptions } from './RoutingEssentials'
import RouteCollection from './RouteCollection'
import Route from './Route'

export default class Router {

	#opts: RouterOptions = { path: '',  }
	#routes: RouteCollection = new RouteCollection()
	#groupStack: RouteAttributes[] = []

	constructor (options?: RouterOptions) {
		if (options)
			this.#opts = options
	}

	public get (uri: string, action: Action) {
		return this.route('GET', uri, action)
	}

	public post (uri: string, action: Action) {
		return this.route('POST', uri, action)
	}

	public put (uri: string, action: Action) {
		return this.route('PUT', uri, action)
	}

	public patch (uri: string, action: Action) {
		return this.route('PATCH', uri, action)
	}

	public delete (uri: string, action: Action) {
		return this.route('DELETE', uri, action)
	}

	public options (uri: string, action: Action) {
		return this.route('OPTIONS', uri, action)
	}

	public any (uri: string, action: Action) {
		return this.route(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], uri, action)
	}

	public route (methods: METHOD | METHOD[], uri: string, action: Action) {
		return this.#routes.add(this.createRoute(methods, uri, action))
	}

	public group (attributes: RouteAttributes, routes: Action): void {

		this.#groupStack.push(attributes)
		this.loadRoutes(routes)
		this.#groupStack.pop()

	}

	public flush (): void {
		this.#routes.clear()
	}

	protected loadRoutes (routes: Action) {
		if (routes instanceof Function) {
			routes(this)
		}else if (typeof(routes) === 'string') {
			const _routes = routes as string
			// eslint-disable-next-line
			const route = require(path.join(this.#opts.path, _routes)).Route as Router

			if (route == undefined) throw new Error(`Route file needs to export a valid Router. '${typeof(route)}' exported.`)
			this.#routes.getRoutes().push(...route.#routes.getRoutes().map(x => this.mergeGroupAttributes(x)))
		}else {
			throw new TypeError('Invalid Group Action provided. Exprected "string" or "function".')
		}
	}

	private createRoute (methods: METHOD | METHOD[], uri: string, action: Action): Route {
		methods = <METHOD[]>(typeof (methods) === 'string' ? [methods] : methods)
		const route = new Route(methods, uri, action)

		if (this.#groupStack.length > 0) {
			this.mergeGroupAttributes(route)
		}

		return route
	}

	private mergeGroupAttributes (route: Route): Route {
		let prefix = route.attribs.prefix || ''
		this.#groupStack.reverse().forEach(lastGroup => {
			prefix = `${_.trim(lastGroup['prefix'], '/')}/${prefix}`
		})
		return route.prefix(prefix)
	}

	public get routes (): Route[] {
		return this.#routes.getRoutes()
	}

	public getRouteByName (name: string): Route {
		return this.#routes.getByName(name)
	}

	public refresh (): void {
		this.#routes.refreshNames()
	}
}