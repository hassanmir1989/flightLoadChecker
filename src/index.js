import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class FlighLoadChecker extends React.Component {
  constructor() {
    super();
    this.onChangeLoad = this.onChangeLoad.bind(this);
    this.generateLoad = this.generateLoad.bind(this);
    this.onChangeFlightFiter = this.onChangeFlightFiter.bind(this);
    this.state = {
      flightLoad: "",
      singleFlight: [],
      flightFilter: 0
    };
  }

  onChangeLoad(e) {
    e.persist();
    this.setState({
      flightLoad: e.target.value.replace(/\s/g, "")
    });
  }
  /*  */
  generateLoad() {
    let counter = 0;
    let endCounter = 48;
    let singleFlight = [];
    while (counter <= this.state.flightLoad.length) {
      singleFlight.push(this.state.flightLoad.slice(counter, endCounter));

      counter = counter + 48;
      endCounter = endCounter + 48;
    }
    singleFlight.pop();
    this.setState({
      singleFlight
    });
  }

  onChangeFlightFiter(e) {
    e.persist();
    this.setState(() => ({
      flightFilter: parseInt(e.target.value)
    }));
  }
  render() {
    return (
      <div>
        <textarea
          placeholder="Enter flight load"
          onChange={this.onChangeLoad}
          value={this.state.flightLoad}
        />
        <br />
        <button onClick={this.generateLoad}>Generate</button>
        <br />
        <div>
          <select onChange={this.onChangeFlightFiter}>
            <option value={0}>All</option>
            <option value={40}>More than 40%</option>
            <option value={60}>More than 60%</option>
            <option value={80}>More than 80%</option>
          </select>
        </div>{" "}
        <br />
        <table>
          <thead>
            <tr>
              <th colSpan={2}>Flight Number</th>
              <th colSpan={2}>Date</th>
              <th colSpan={2}>Sector</th>
              <th colSpan={2}>Capacity</th>
              <th colSpan={2}>Booked</th>
              <th colSpan={2}>Booked %</th>
            </tr>
          </thead>
          {this.state.singleFlight.map((singleFlight, index) => {
            let flightNumber = singleFlight.slice(0, 6);
            let flightDate = singleFlight.slice(6, 11);
            let flighSector = singleFlight.slice(12, 18);
            let fClassCapacity = singleFlight.slice(18, 20);
            let jClassCapacity = singleFlight.slice(20, 22);
            let yClassCapacity = singleFlight.slice(22, 25);

            let fClassBooked = singleFlight.slice(25, 27);
            let jClassBooked = singleFlight.slice(27, 29);
            let yClassBooked = singleFlight.slice(29, 32);

            let fClassPercentage =
              (Number(fClassBooked) / Number(singleFlight.slice(18, 20))) * 100;
            let jClassPercentage =
              (Number(singleFlight.slice(27, 29)) /
                Number(singleFlight.slice(20, 22))) *
              100;
            let yClassPercentage =
              (Number(singleFlight.slice(29, 32)) /
                Number(singleFlight.slice(22, 25))) *
              100;

            if (yClassPercentage > this.state.flightFilter) {
              return (
                <tr key={index}>
                  <td colSpan={2}>{flightNumber}</td>

                  <td colSpan={2}>{flightDate}</td>
                  <td colSpan={2}>{flighSector}</td>
                  <td colSpan={2}>
                    F-{fClassCapacity} <br />
                    J-
                    {jClassCapacity} <br />
                    Y-{yClassCapacity}
                  </td>
                  <td colSpan={2}>
                    F-{fClassBooked} <br />
                    J-
                    {jClassBooked} <br />
                    Y-{yClassBooked}
                  </td>

                  <td colSpan={2}>
                    F-
                    {parseInt(fClassPercentage)} %
                    <br />
                    J-
                    {parseInt(jClassPercentage)} %<br />
                    Y-
                    {parseInt(yClassPercentage)} %<br />
                  </td>
                </tr>
              );
            }
          })}
        </table>
      </div>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<FlighLoadChecker />, rootElement);
