import Middleware from "../Application/Middleware";
export declare type METHOD = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS";
export declare type Action = Function | string | null;
export interface RouterOptions {
    path: string;
}
export declare type MiddlewareType = Middleware | Function | string;
export interface RouteAttributes {
    prefix?: string;
    name?: string;
    where?: Object;
}
export interface IRouterDispatcher {
    create(): any;
    dispatch(app: any): any;
}
export interface DispatcherOptions {
    path: string;
}
export declare type MiddlewareOptions = any;
