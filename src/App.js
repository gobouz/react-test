import React from 'react';
import GoogleMap from 'google-map-react';
// import logo from './logo.svg';
import './assets/css/app.min.css';
import Flat from './components/flat';
import Marker from './components/marker';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flats: [],
      filteredFlats: [],
      selectedFlat: null,
      search: ''
    };
  }

  componentDidMount() {
    const url = 'https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json';

    fetch(url)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          flats: data,
          filteredFlats: data
        });
      });
  }

  selectFlat = (flat) => {
    console.log(flat);
    this.setState({
      selectedFlat: flat
    })
  }

  handleSearch = (event) => {
    console.log(event);
    this.setState({
      search: event.target.value,
      flats: this.state.filteredFlats.filter((flat) => new RegExp(event.target.value, 'i').exec(flat.name))
    })
  }

  render() {
    let center = {
      lat: 48.8529,
      lng: 2.3448
    }

    if (this.state.selectedFlat) {
      center = {
        lat: this.state.selectedFlat.lat,
        lng: this.state.selectedFlat.lng,
      }
    }
    const GoogleMapConfig = {
      key: 'AIzaSyBLecB8OsqnbWI3wLG_EgIqgVX5wWkAtQI',
    }

    // const flat =  {
    //   "name": "Trendy Apt in Buttes Montmartre",
    //   "imageUrl": "https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/images/flat1.jpg",
    //   "price": "200",
    //   "priceCurrency": "EUR",
    //   "lat": 48.885707,
    //   "lng": 2.343543
    // };

    // const flats = [flat, flat, flat];

    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>

      <div className="app">
        <div className="main">
          <div className="search">
            <input
              type="text"
              placeholder="search..."
              value={this.state.search}
              onChange={this.handleSearch} />
          </div>
          <div className="flats">
          {this.state.flats.map((flat) => {
            return <Flat key={flat.name} flat={flat} selectFlat={this.selectFlat} />
          })}
          </div>
        </div>
        <div className="map">
          <GoogleMap bootstrapURLKeys={GoogleMapConfig} center={center} zoom={12}>
            {this.state.flats.map((flat) => {
              return <Marker
                key={flat.name}
                lat={flat.lat}
                lng={flat.lng}
                text={flat.price}
                selected={flat === this.state.selectedFlat} />
            })}
          </GoogleMap>
        </div>
      </div>
    );
  }
}
