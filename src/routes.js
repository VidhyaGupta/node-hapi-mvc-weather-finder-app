
const controller = require("./controllers/controller")

module.exports =  [
    {
        method: 'GET',
        path: '/',
        handler: controller.renderHomePage
    
    },
    {
        method: 'POST',
        path: '/',
        handler: controller.getWeather
    },
    {
        method: 'GET',
        path: '/about',
        handler: controller.renderAboutPage
    }
]