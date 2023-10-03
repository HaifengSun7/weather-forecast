import * as React from "react";

interface IState {
  city: string;
  showErrorInfo: boolean;
}

export interface Props {
  onSubmitWeekly: Function;
  onSubmitHourly: Function;
}

export default class extends React.Component<Props, IState> {
  state = {
    city: "",
    showErrorInfo: false
  };

  handleChange = (e: any) => {
    const value: string = e.target.value;
    this.setState({
      city: value
    });
  };

  submitData = (e: any) => {
    e.preventDefault();
    if (this.state.showErrorInfo) {
      this.setState({
        showErrorInfo: false
      });
    }
    this.getWeeklyData();
    this.getHourlyData();
  };

  getHourlyData = () => {
    const apiKey: string = "61e3c4acca73ca87fea8c4c7eb9987dd";
    const urlhourly: string = `https://api.openweathermap.org/data/2.5/forecast?q=${
      this.state.city
    }&units=metric&APPID=${apiKey}`;

    fetch(urlhourly)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        this.setState({
          showErrorInfo: true
        });
        return false;
      })
      .then(jsonResponse => {
        if (jsonResponse) {
          this.props.onSubmitHourly(jsonResponse.list);
        }
      });
  };

  getWeeklyData = () => {
    const apiKey: string = "61e3c4acca73ca87fea8c4c7eb9987dd";
    const urlweekly: string = `https://api.openweathermap.org/data/2.5/forecast?q=${
      this.state.city
    }&units=metric&APPID=${apiKey}`;

    fetch(urlweekly)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        this.setState({
          showErrorInfo: true
        });
        return false;
      })
      .then(jsonResponse => {
        console.log(jsonResponse)
        if (jsonResponse) {
          jsonResponse.list = jsonResponse.list.filter((item: any)=>{
            return item.dt_txt.includes("06:00:00")})
          this.props.onSubmitWeekly(jsonResponse.list);
        }
      });
  };

  render() {
    return (
      <form className="panel-form">
        <input
          type="text"
          className="text-input is-rounded"
          placeholder="Enter a city"
          onChange={this.handleChange}
          value={this.state.city}
        />
        <button className="btn submit is-rounded" onClick={this.submitData}>
          Search
        </button>
        {this.state.showErrorInfo && (
          <div className="error-info">Invalid name. Try again</div>
        )}
      </form>
    );
  }
}
