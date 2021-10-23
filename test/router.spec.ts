import 'mocha'
import 'chai'

import { 	
    CompiledRoute,
	Router,
	RouterDispatcher
} from '../src'

import { expect } from 'chai'
import * as path from 'path'

describe("Routing", () => {

    it('should work', () => {

        let r = new Router()
        expect(r.routes).to.have.length(0)

        r.get('/', () => 'home get route')
        r.post('/', () => 'home post route')
        r.put('/', () => 'home put route')
        r.patch('/', () => 'home patch route')
        r.delete('/', () => 'home delete route')
        r.options('/', () => 'home options route')
        r.any('/any', () => 'any route')

        expect(r.routes).to.have.length(7)

        r.flush()
        expect(r.routes).to.have.length(0)


        let s = new Router({
            path: path.resolve("./test/extra/")
        })

        expect(() => {
            s.group({}, null)
        }).to.throw('Invalid Group Action provided. Exprected "string" or "function".')

        s.group({ prefix: 'yolo' }, () => {
            s.get('/lvl1', () => 'this is lvl1').where({
                boss: 'oyabun'
            })

            s.group({ prefix: 'oppai' }, () => {

                let ro = s.get('/route2', () => 'this is route0 with prefix').name('oppai.route2').name('route')

                expect(s.getRouteByName('route')).to.eql(undefined)
                expect(s.getRouteByName('oppai.route2')).to.eql(undefined)
        
                s.refresh()
        
                expect(s.getRouteByName('route')).to.eql(undefined)
                expect(s.getRouteByName('oppai.route2')).to.eql(ro)

                s.get('/route1', () => 'this is route1 with prefix').prefix('somewhere').where('a', 'b').middleware(()=>'goonga hai kya')

            })
        })

        expect(s.routes.length).to.eql(3)

        s.flush()

        expect(() => {
            s.group({}, 'emptyfile')
        }).to.throw("Route file needs to export a valid Router. 'undefined' exported.")

        s.flush()

        s.group({ prefix: 'filewala'}, 'testroutefile')
        s.refresh()
        expect(s.getRouteByName('fileone').uri).to.eql('/filewala/file1')

        s.flush()

        let dispatcher = new RouterDispatcher(s, {
            path: path.resolve("./test/extra/conts")
        })

        s.get('something', () => "Just like this")
        expect(((dispatcher.load().next().value as CompiledRoute).compiledAction as Function)()).to.eq("Just like this")

        s.flush()

         expect(() => {
            s.get('/', null).name('tobenull')
            dispatcher.load().next()
        }).to.throw("Action not implemented.")

        s.flush()

        // Controller route
        s.get('/cont', 'DumbControllerRoute')
        
        expect(() => {
            dispatcher.load().next()
        }).to.throw("Invalid route action [DumbControllerRoute] for route [/filewala/cont]")

        s.flush()
        
        s.get('/cont', 'Dummy.index')
        expect(() => {
            dispatcher.load().next()
        }).to.throw("Controller for action [Dummy.index] doesn't export a default controller class.")

        s.flush()

        s.get('/cont', 'Test.idontexist')
        expect(() => {
            dispatcher.load().next()
        }).to.throw("Controller [Test] doesn't have method [idontexist] for action Test.idontexist")

        s.flush()
        
        s.get('/cont', 'Test.index')
        expect(((dispatcher.load().next().value as CompiledRoute).compiledAction as Function)()).to.eq('iPassed')
        
    })

})