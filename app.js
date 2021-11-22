'use strict'

const Path = require('path')
const Hapi = require('@hapi/hapi')
var Routes = require('./src/routes');
const env =require('node-env-file')
env('.env')

const init = async() => {
    const server = Hapi.server( {
       port : process.env.PORT || 5000,
       host: 'localhost' 
    })

    await server.register([ {
        plugin: require('@hapi/vision')
    }])
    
    server.route(Routes);

    server.views( {
        engines: {
            hbs: require('handlebars')
        },
        path: Path.join(__dirname, 'views')
    })

    await server.start()

    console.log(`Server running at ${server.info.uri}`)
}

process.on('unhandledRejection',(err)=> {
    console.log(err)
    process.exit(1)
})

init();