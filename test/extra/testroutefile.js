
const Route = new (require('../../src').Router)

Route.get('/file1').name('fileone')

exports.Route = Route