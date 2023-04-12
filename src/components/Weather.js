import React from 'react';

function Weather(props) {
    return (
      <div>
        {props.city && (
          <div className='infoWeath'>
            <p>Місто: {props.city}, {props.country}</p>
            <p>Температура: {props.temp}</p>
            <p>Схід сонця: {props.sunrise}</p>
            <p>Захід сонця: {props.sunset}</p>
          </div>
        )}
        <p className='error'>{props.error}</p>
      </div>
    );
}

export default Weather;