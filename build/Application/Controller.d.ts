/**
 * @name Controller
 * @author Robin Panta <hacktivistic@gmail.com>
 */
export default class Controller {
    constructor();
    middlewares: Array<string | Function>;
    middleware(middleware: string | Function): void;
}
