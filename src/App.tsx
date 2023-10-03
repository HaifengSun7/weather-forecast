import * as React from "react";
import "./App.css";
import SearchForm from "./Components/SearchForm";
import Card from "./Components/Card";
import * as moment from "moment";
import ForecastTable from "./Components/ForecastTable";
import Row from "./Components/Row";

interface IState {
  weeklyForecast: Array<object>;
  hourlyForecast: Array<object>;
  displayWeeklyForecast: boolean;
  displayTable: boolean;
  dayDetails: Array<object>;
  checkedDay: string;
}

class App extends React.Component<{}, IState> {
  state = {
    weeklyForecast: [],
    hourlyForecast: [],
    displayWeeklyForecast: false,
    displayTable: false,
    checkedDay: "",
    dayDetails: []
  };

  handleSubmitWeekly = (jsonResponse: Array<object>) => {
    this.setState({
      weeklyForecast: jsonResponse,
      displayWeeklyForecast: true,
      displayTable: false,
    });
  };

  handleSubmitHourly = (jsonResponse: Array<object>) => {
    this.setState({
      hourlyForecast: jsonResponse
    });
  };

  handleHideTable = () => {
    this.setState({
      displayTable: false
    });
  };

  handleGetDayDetails = (day: any) => {
    const { hourlyForecast } = this.state;
    const arrayLength: number = hourlyForecast.length;
    const matchingForecasts: Array<any> = [];
    
    for (let i = 0; i < arrayLength; i++) {
      let dataStamp: any = this.getTimeStamp(hourlyForecast[i]);
      dataStamp = dataStamp.slice(0, 10);
      let weekDay: string = moment(dataStamp).format("dddd");
      if (day === weekDay) {
        matchingForecasts.push(hourlyForecast[i]);
      }
    }
    this.setState({
      dayDetails: matchingForecasts,
      displayTable: true,
      checkedDay: day
    });
  };

  getTimeStamp = (currentForecast: { dt_txt: string }): string => {
    return currentForecast.dt_txt;
  };

  getDayName = (dayIndex: number): string => {
    const currentDay = moment().day() + dayIndex;
    const dayName = moment()
      .day(currentDay)
      .format("dddd");
    return dayName;
  };

  public render() {
    const { weeklyForecast, displayWeeklyForecast, displayTable, checkedDay } = this.state;

    return (
      <div className="App">
        <div className="panel-container">
          <div className="searchPanel">
            <h1 className="title">Weather Forecast</h1>
            <SearchForm
              onSubmitWeekly={this.handleSubmitWeekly}
              onSubmitHourly={this.handleSubmitHourly}
            />
          </div>
        </div>
        <div className="result-container">
          {displayWeeklyForecast &&
            weeklyForecast.map((dailydata: any, index: number) => (
              <Card
                onDisplayDetails={this.handleGetDayDetails}
                forecast={dailydata}
                key={dailydata.dt}
                day={this.getDayName(index)}
              />
            ))}
          {displayTable && (
            <div className="forecast-table-wrapper">
              <ForecastTable currentDay={checkedDay} onClose={this.handleHideTable}>
                {this.state.dayDetails.map((hourlyData: any) => (
                  <Row 
                  key={hourlyData.dt} 
                  hourlyData={hourlyData} 
                  />
                ))}
              </ForecastTable>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
