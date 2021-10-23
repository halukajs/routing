import Middleware from '../Application/Middleware';
export declare type METHOD = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS';
export declare type Action = CallableFunction | string | null;
export interface RouterOptions {
    path: string;
}
export declare type MiddlewareType = Middleware | CallableFunction | string;
export interface RouteAttributes {
    prefix?: string;
    name?: string;
    where?: KeyValue;
}
export interface IRouterDispatcher {
    create(): any;
    dispatch(_app: any): any;
}
export interface DispatcherOptions {
    path: string;
}
export declare type MiddlewareOptions = any;
export declare type KeyValue = {
    [key: string]: string;
};
