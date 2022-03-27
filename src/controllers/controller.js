const Axios = require('axios')

//comment import of env module for deploying on heroku
const env =require('node-env-file')    
env('.env')

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

            try {
                const response = await Axios.get(url);
                console.log(response)
                const {temp : temperature} = response.data.main
                const {name : location} = response.data
                return `It is currently ${temperature} °C in ${location}.`;
              } catch(err) {
                return err.response.data.message;
              }

            
        }
      return h.view('index',{
          weather: await weatherfunc()
        })
    }
    
}

exports.renderAboutPage = (response,h)=> {
            return h.view('about')
        }
