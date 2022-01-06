
const Route = new (require('../../src').Router)

Route.get('/file1').name('fileone')

Route.group({ prefix: 'filegroup'}, () => {

    Route.get('/filegroup1').name('filegroup2')

})

exports.Route = Route