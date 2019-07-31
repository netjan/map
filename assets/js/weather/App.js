import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import InfoWindow from "react-google-maps/lib/components/InfoWindow"
import Weather from "./weather";
import Axios from 'axios';

const GOOGLE_API_KEY = 'AIzaSyCQuvYs5aipSWaUFjPTIr9so_VrewfEDJo';
const OPENWEATHERMAP_API_KEY = '15c0f5c80540a9b0839f0d9b210039ab';
const bydgoszcz = { lat: 53.123476, lng: 18.008436 };
const mapHeight = window.innerHeight;

const MapWithWeather = withScriptjs(withGoogleMap(props =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={bydgoszcz}
        onClick={props.onMapClick}
    >
        {props.isMarkerShown && <Marker position={props.markerPosition}>
            {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
                <div>
                    <h3>{props.titleWindow}</h3>
                    <Weather
                        cw={props.cw} // current weather
                        error={props.error}
                        success={props.success}
                    />
                </div>
            </InfoWindow>}
        </Marker>}
    </GoogleMap>
));

class App extends React.Component {

    state = {
        isMarkerShown: false,
        markerPosition: null,
        isOpen: true,
        titleWindow: '',
        weather: {},
        error: '',
        success: ''
    }

    handleMapClick = (e) => {
        this.setState({
            isMarkerShown: true,
            markerPosition: { lat: e.latLng.lat(), lng: e.latLng.lng() },
            isOpen: true,
            titleWindow: "Current weather"
        });
        this.getWeather();
    }

    handleToggleOpen = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    getWeather = async () => {
        var lat = this.state.markerPosition.lat;
        var lon = this.state.markerPosition.lng;
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHERMAP_API_KEY}&lang=pl&units=metric`);
        const response = await api_call.json();
        this.setState({
            weather: {
                lon: response.coord.lon,
                lat: response.coord.lat,
                dt: response.dt,
                name: response.name,
                country: response.sys.country,
                main: response.weather[0].main,
                description: response.weather[0].description,
                temperature: response.main.temp,
                pressure: response.main.pressure,
                humidity: response.main.humidity,
                wind_speed: response.wind.speed,
                wind_deg: response.wind.deg,
                clouds: response.clouds.all
            },
            error: '',
            success: '',
        });
        this.saveWeather();
    }

    saveWeather = () => {
        Axios.post('/weathers', this.state.weather)
        .then(response => {
            this.setState({
                success: 'Data saved.'
            })

        })
        .catch(error => {
            if (error.response) {
                this.setState({
                    error: "Not saved: " + error.response.data.message
                })    
            } else {
                this.setState({
                    error: "Not saved: " +  error.message
                })
            }
        });
    }

    render() {
        return (
            <MapWithWeather
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `${mapHeight}px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                onMapClick={this.handleMapClick}
                onToggleOpen={this.handleToggleOpen}
                isMarkerShown={this.state.isMarkerShown}
                markerPosition={this.state.markerPosition}
                isOpen={this.state.isOpen}
                titleWindow={this.state.titleWindow}
                cw={this.state.weather}
                error={this.state.error}
                success={this.state.success}
            />
        )
    }
}

export default App