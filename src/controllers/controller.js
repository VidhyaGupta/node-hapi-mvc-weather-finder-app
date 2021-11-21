const Axios = require('axios')
const env =require('node-env-file')
env('../.env')

const API_KEY = process.env.API_KEY

const Weather = require("../models/Weather")

exports.renderHomePage = (response,h)=> {
    return h.view('index')
}

exports.getWeather =  async (request, h) => {
    const city= request.payload.city
    const url= `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    const weather = new Weather(city)
    weather.validateUserInput()
    if (weather.errors.length){
        return h.view('index',{
            error: weather.errors.toString()
        })
    } else {
        const weatherfunc = async ()=> {
            const response = await Axios.get(url);
            const {temp : temperature} = response.data.main
            const {name : location} = response.data
            return `It is currently ${temperature} °C in ${location}.`;
        }
      return h.view('index',{
          weather: await weatherfunc()
        })
    }
    
}

exports.renderAboutPage = (response,h)=> {
            return h.view('about')
        }