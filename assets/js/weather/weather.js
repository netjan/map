import React from "react";

class Weather extends React.Component {

    render() {
        return (

            <div className="weather-info">
                {
                    this.props.cw.country && this.props.cw.name && <p>Country, name:&nbsp;
                        <span className="font-weight-bold">{this.props.cw.country}, {this.props.cw.name}</span></p>
                }
                {
                    this.props.cw.description && <p>Description:
                        <span className="font-weight-bold">  {this.props.cw.description}</span>
                    </p>
                }
                {
                    this.props.cw.temperature && <p>Temperature:&nbsp;
                        <span className="font-weight-bold">  {this.props.cw.temperature.toString().replace(".",",")}°C</span>
                    </p>
                }
                {
                    this.props.cw.pressure && <p>Pressure:&nbsp;
                        <span className="font-weight-bold">  {this.props.cw.pressure.toString().replace(".",",")}hPa</span>
                    </p>
                }
                {
                    this.props.cw.humidity && <p>Humidity:
                        <span className="font-weight-bold">  {this.props.cw.humidity}%</span>
                    </p>
                }
                {
                    this.props.cw.wind_speed && <p>Wind (speed):
                        <span className="font-weight-bold">  {this.props.cw.wind_speed.toString().replace(".",",")}m/s</span>
                    </p>
                }
                {
                    this.props.cw.wind_deg && <p>Wind (direction):
                        <span className="font-weight-bold">  {this.props.cw.wind_deg.toString().replace(".",",")}°</span>
                    </p>
                }
                {
                    (this.props.cw.clouds || 0 == this.props.cw.clouds)  && <p>Clouds:
                        <span className="font-weight-bold">  {this.props.cw.clouds}%</span>
                    </p>
                }
                {
                    this.props.error && <p className="text-danger">{this.props.error}</p>
                }
                {
                    this.props.success && <p className="text-success">{this.props.success}</p>
                }
            </div>
        )
    }
}

export default Weather;