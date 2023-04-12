import "./styles.css";
import { MapContainer, TileLayer, GeoJSON, useMap, flyTo } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React, { useState } from "react";
import Foot from "./Foot";
import counties from "./counties.json";

export default function App() {
  const [coordinates, setCoordinates] = React.useState([36.05, -103.04]);
  const [countyNames, setCountyNames] = React.useState([]);
  const [currentCounty, setCurrentCounty] = React.useState("Dallam");
  const localCounties = counties.features;

  function picker(e) {
    const pickedCounty = e.target.value;
    const selectedCountyProps = localCounties.filter(
      (county) => county.properties.name == currentCounty
    );

    const selectedCountyCoords =
      selectedCountyProps[0].geometry.coordinates[0][0];
    setCurrentCounty(pickedCounty);
    setCoordinates(selectedCountyCoords);
    console.log(selectedCountyCoords);
  }

  React.useEffect(function () {
    fetch("https://data.texas.gov/resource/m3yf-ffwm.json")
      .then((res) => res.json())
      .then((data) =>
        setCountyNames(
          data.map((obj) => (
            <option key={obj.name} value={obj.name}>
              {obj.name}
            </option>
          ))
        )
      );
  }, []);

  return (
    <div className="App">
      <div className="head-container">
        <nav>
          <img src="./images/tx-flag.png" className="tx-icon" />
          <h1 id="title" className="title">
            Texas County Viewer:
          </h1>{" "}
          <h1 id="tc" className="title">
            {currentCounty} {coordinates}
          </h1>
          <div className="picker">
            <label for="county">Choose county: </label>
            <select
              onChange={picker}
              id="county"
              name="county"
            >
              {countyNames}
            </select>
          </div>
        </nav>
      </div>

      <MapContainer center={[36.05, -103.04]} zoom={8} scrollWheelZoom={true}>
        <GeoJSON data={localCounties} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <Foot />
    </div>
  );
}
