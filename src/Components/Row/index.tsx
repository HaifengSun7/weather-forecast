import * as React from "react";

interface weather {
  description: string;
  icon: string;
}

export interface Props {
  hourlyData: {
    weather: Array<weather>;
    main: {
      temp: number;
      pressure: number;
    };
    wind: {
      speed: number;
    };
    dt: number;
    dt_txt: string;
  };
}

function Row({ hourlyData }: Props) {
  return (
    <tr key={hourlyData.dt}>
      <td>{extractTime(hourlyData.dt_txt)}</td>
      <td>{hourlyData.main.temp.toFixed(1)}</td>
      <td>{hourlyData.main.pressure.toFixed()}</td>
      <td className="wind-info">{hourlyData.wind.speed}</td>
      <td>
        <img
          className="weather-icon"
          src={`http://openweathermap.org/img/w/${
            hourlyData.weather[0].icon
          }.png`}
          alt={hourlyData.weather[0].description}
        />
      </td>
    </tr>
  );
}

function extractTime(fullData: string): string {
  return fullData.slice(11, 16);
}

export default Row;
