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

	private opts: RouterOptions = { path: '',  }
	private _routes: RouteCollection = new RouteCollection()
	private groupStack: RouteAttributes[] = []

	constructor (options?: RouterOptions) {
		if (options)
			this.opts = options
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
		return this._routes.add(this.createRoute(methods, uri, action))
	}

	public group (attributes: RouteAttributes, routes: Action): void {

		this.groupStack.push(attributes)
		this.loadRoutes(routes)
		this.groupStack.pop()
	}

	public flush (): void {
		this._routes.clear()
	}

	protected loadRoutes (routes: Action) {
		if (routes instanceof Function) {
			routes(this)
			// this.#groupStack.pop()
		}else if (typeof(routes) === 'string') {
			const _routes = routes as string
			// eslint-disable-next-line
			const route = require(path.join(this.opts.path, _routes)).Route as Router

			// if (route == undefined) // either a broken route file or a singleton router
			//throw new Error(`Route file needs to export a valid Router. '${typeof(route)}' exported.`)

			this._routes.getRoutes().push(...route._routes.getRoutes().map(x => this.mergeGroupAttributes(x)))

		}else {
			this.groupStack.pop()
			throw new TypeError('Invalid Group Action provided. Exprected "string" or "function".')
		}
	}

	private createRoute (methods: METHOD | METHOD[], uri: string, action: Action): Route {
		methods = <METHOD[]>(typeof (methods) === 'string' ? [methods] : methods)
		const route = new Route(methods, uri, action)

		if (this.groupStack.length > 0) {
			this.mergeGroupAttributes(route)
		}

		return route
	}

	private mergeGroupAttributes (route: Route): Route {
		let prefix = route.attribs.prefix || ''
		this.groupStack.slice(0).reverse().forEach(lastGroup => {
			prefix = `${_.trimStart(lastGroup['prefix'], '/')}/${prefix}`
		})
		route.attribs.prefix = _.trim(prefix, '/')
		return route
	}

	public get routes (): Route[] {
		return this._routes.getRoutes()
	}

	public getRouteByName (name: string): Route {
		return this._routes.getByName(name)
	}

	public refresh (): void {
		this._routes.refreshNames()
	}
}