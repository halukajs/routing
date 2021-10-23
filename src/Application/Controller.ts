'use strict'

/**
 * @name Controller
 * @author Robin Panta <hacktivistic@gmail.com>
 */

export default class Controller {
    
	public middlewares: Array<string | CallableFunction> = []

	public middleware(middleware: string | CallableFunction) {
		this.middlewares.push(middleware)
	}

}