import React from 'react';
import './App.css';
import Info from './components/Info';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = "6f7e15f15aa44c16d6d752ad52b3237e";

function App() {

  const [weatherData, setWeatherData] = React.useState({
    temp: null,
    city: null,
    country: null, 
    sunrise: null,
    sunset: null,
    error: null
  })

  const gettingWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
  
    try {
      if(city) {
        const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(api_url);
        const data = await response.json();
        console.log(data);

        function timeConverter(UNIX_timestamp) {
          let a = new Date(UNIX_timestamp * 1000);
          let hour = a.getHours();
          let min = "0" + a.getMinutes();
          let sec = "0" + a.getSeconds();
          let time = hour + ':' + min.substr(-2) + ':' + sec.substr(-2) ;
          return time;
        }
        let sunset = data.sys.sunset,
            sunrise = data.sys.sunrise;
        let sunset_date = timeConverter(sunset);
        let sunrise_date = timeConverter(sunrise);

        setWeatherData({
          temp: data.main.temp,
          city: data.name,
          country: data.sys.country,
          sunrise: sunrise_date,
          sunset: sunset_date,
          error: null,
        });
      } else {
        setWeatherData({
          temp: null,
          city: null,
          country: null, 
          sunrise: null,
          sunset: null,
          error: "Будь ласка, введіть ваше місто"
        });
      }
    } catch (error) {
      console.error('Помилка при отриманні даних про погоду', error);
      setWeatherData({
        temp: null,
        city: null,
        country: null, 
        sunrise: null,
        sunset: null,
        error: "Помилка при отриманні даних про погоду"
      });
    }
  };

  return (
    <div className="wrapper">
      <div className="main">
        <div className="container">
          <div className="row">
            <div className="col-sm-5 info">
              <Info />
            </div>
            <div className="col-sm-7 form">
              <Form weatherMethod={gettingWeather} />
              <Weather {...weatherData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
