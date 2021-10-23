import { Controller } from "../../../src";

export default class Test extends Controller {

    index (req: any, res: any) {

        this.middleware('LOL')
        return 'iPassed'

    }

}