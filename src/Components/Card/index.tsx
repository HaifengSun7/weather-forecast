import * as React from "react";

interface weather {
  description: string;
  icon: string;
}
export interface Props {
  forecast: {
    weather: Array<weather>;
    main: {
      temp: number;
      pressure: number;
    };
    wind: {
      speed: number;
    };
  };
  key: number;
  day: any;
  onDisplayDetails: Function;
}

function Card({ forecast, day, onDisplayDetails }: Props) {
  return (
    <div
      className="card"
      onClick={() => {
        onDisplayDetails(day);
      }}
    >
      <div className="centered-text">{day}</div>
      <img
        className="weather-icon"
        src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
        alt={forecast.weather[0].description}
      />
      <ul>
        <li>{forecast.main.temp.toFixed(1)}°C</li>
        <li>{forecast.main.pressure.toFixed()} hPa</li>
        <li>{forecast.wind.speed} m/s</li>
      </ul>
    </div>
  );
}

export default Card;
