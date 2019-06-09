import React from "react";
import ReactDOM from "react-dom";
import { FormGroup, Label, Input, Button, Table } from "reactstrap";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
        <FormGroup>
          <div className="text-center font-weight-bold">
            <Label>Flight Load Calculator</Label>
          </div>
          <div className="mx-2">
            <Input
              placeholder="Enter flight load"
              onChange={this.onChangeLoad}
              value={this.state.flightLoad}
              type="textarea"
              name="text"
              id="exampleText"
            />
          </div>
        </FormGroup>
        <div className="text-center">
          <Button className="mb-3" color="primary" onClick={this.generateLoad}>
            Generate
          </Button>{" "}
        </div>

        <FormGroup className="mx-2">
          <Label for="exampleSelect">Y Class Filter</Label>
          <Input
            type="select"
            name="select"
            onChange={this.onChangeFlightFiter}
          >
            <option value={0}>All</option>
            <option value={40}>More than 40%</option>
            <option value={60}>More than 60%</option>
            <option value={80}>More than 80%</option>
          </Input>
        </FormGroup>
        <Table className="text-center" bordered>
          <thead>
            <tr>
              <th>Flight Number</th>
              <th>Date</th>
              <th>Sector</th>
              <th>Capacity</th>
              <th>Booked</th>
              <th>Booked %</th>
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
                  <td>{flightNumber}</td>

                  <td>{flightDate}</td>
                  <td>{flighSector}</td>
                  <td>
                    F-{fClassCapacity} <br />
                    J-
                    {jClassCapacity} <br />
                    Y-{yClassCapacity}
                  </td>
                  <td>
                    F-{fClassBooked} <br />
                    J-
                    {jClassBooked} <br />
                    Y-{yClassBooked}
                  </td>

                  <td>
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
        </Table>
      </div>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<FlighLoadChecker />, rootElement);
