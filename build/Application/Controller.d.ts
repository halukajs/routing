/**
 * @name Controller
 * @author Robin Panta <hacktivistic@gmail.com>
 */
export default class Controller {
    middlewares: Array<string | CallableFunction>;
    middleware(middleware: string | CallableFunction): void;
}
