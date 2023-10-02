import * as React from "react";

interface Props {
  children: React.ReactNode;
  currentDay: string;
  onClose: Function;
}

class ForecastTable extends React.Component<Props> {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th colSpan={5} className="table-header">
              {this.props.currentDay}
              <button className="close-btn" onClick={() => this.props.onClose()}>X</button>
            </th>
          </tr>
          <tr>
            <th>Time</th>
            <th>Temperature [°C]</th>
            <th>Pressure [hPa]</th>
            <th className="wind-info">Wind Speed [m/s]</th>
            <th>Weather</th>
          </tr>
        </thead>
        <tbody>{this.props.children}</tbody>
      </table>
    );
  }
}

export default ForecastTable;
