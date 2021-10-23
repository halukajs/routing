'use strict'

/**
 * @name CompiledRoute
 * @author Robin Panta <hacktivistic@gmail.com>
 */

import { DispatcherOptions, KeyValue, METHOD } from './RoutingEssentials'
import Route from './Route'
import { isNull, isString } from 'lodash'
import Controller from '../Application/Controller'

export default class CompiledRoute {
	uri: string
	methods: METHOD[]
	name: string
	compiledAction: CallableFunction
	middlewares: any[]
	conditions: KeyValue

	constructor (uri: string, methods: METHOD[], name: string, middlewares: any[], compiledAction: CallableFunction, conditions: KeyValue) {
		this.uri = uri
		this.methods = methods
		this.name = name
		this.compiledAction = compiledAction
		this.middlewares = middlewares
		this.conditions = conditions
	}

	public static FromRoute (route: Route, compilerOptions: DispatcherOptions): CompiledRoute {

		let action = route.action

		if (isNull(action)) {
			throw new TypeError('Action not implemented.')
		}

		// controller
		if (isString(action)) {
			const _action = route.action as string
			const info = _action.split('.')
			if (info.length !== 2) throw new TypeError(`Invalid route action [${route.action}] for route [${route.uri}]`)

			// eslint-disable-next-line
			const ControllerClass = require(compilerOptions.path + '/' + info[0]).default
			if (!ControllerClass) throw new TypeError(`Controller for action [${route.action}] doesn't export a default controller class.`)

			// grab the controller class
			const c = new ControllerClass() as Controller

			if (typeof (c[info[1]]) !== 'function') throw new TypeError(`Controller [${info[0]}] doesn't have method [${info[1]}] for action ${route.action}`)

			// push controller middlewares to route
			route.middlewares.push(...c.middlewares)

			action = (opts: any) => c[info[1]](opts)
		}

		return new CompiledRoute(route.uri, route.methods, route.getName(), route.middlewares, action, route.attribs.where || {})
	}

}

