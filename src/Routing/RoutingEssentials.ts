'use strict'

import Middleware from "../Application/Middleware"

export type METHOD = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS"

export type Action = Function | string | null

// Path to grab route files from
export interface RouterOptions {
	path: string
}

export type MiddlewareType = Middleware | Function | string

export interface RouteAttributes {

    prefix?: string,
    name?: string,
    where?: Object,

}

export interface IRouterDispatcher {
    create (): any
    dispatch (app: any): any

}

// Path to grab controllers by dispatcher
export interface DispatcherOptions {
	path: string
}

export type MiddlewareOptions = any

// controller interface
