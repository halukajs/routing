'use strict'


/**
 * @name Route
 * @author Robin Panta <hacktivistic@gmail.com>
 */

import { Action, METHOD, MiddlewareType, RouteAttributes } from './RoutingEssentials'
import _ = require('lodash')

export default class Route {

    methods: METHOD[]
    #uri: string
    action: Action
    attribs: RouteAttributes
    middlewares: MiddlewareType[] = []

    constructor (methods: METHOD[], uri: string, action: Action) {
        this.methods = methods
        this.#uri = uri
        this.action = action
        this.attribs = { prefix: ''}
    }

    public prefix (prefix: string): this {
        var newPrefix = _.trim(_.trimEnd(this.attribs.prefix, '/') + '/' + _.trimStart(prefix, '/'), '/')
        this.attribs.prefix = newPrefix
        return this
    }

    public where (name: string | Object,  expression?: string): this {
        this.attribs.where = this.attribs.where || {}

        if (typeof(name) === 'string') {
            (<Object>this.attribs.where)[name] = expression
        }else {
            _.merge(this.attribs.where, name)
        }
        return this
    }

    public name (name: string): this {
        this.attribs.name = (this.getName() !== '') ? this.getName() : name 
        return this
    }

    public get uri () {
        return '/' + _.trim(`${this.attribs.prefix}/${_.trimStart(this.#uri, '/')}`, '/')
    }

    public middleware (...middleware: MiddlewareType[]): this {
        middleware.forEach(x => {
            this.middlewares.push(x)
        });
       
        return this
    }

    public getName (): string {
        return this.attribs.name || ''
    }

}
