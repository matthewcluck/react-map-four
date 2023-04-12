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
  const [style, setStyle] = React.useState({ color: "grey" });
  const [styleTwo, setStyleTwo] = React.useState({ color: "yellow" });
  const localCounties = counties.features;
  const [selectedGeo, setSelectedGeo] = React.useState(counties.features[0]);

  function picker(e) {
    const pickedCounty = e.target.value;
    for (let i = 0; i < localCounties.length; i++) {
      if (localCounties[i].properties.name == pickedCounty) {
        let value = i;
        setSelectedGeo(counties.features[i]);
      }
    }
    setCurrentCounty(pickedCounty);
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
            {currentCounty}
          </h1>
          <div className="picker">
            <label for="county">Choose county: </label>
            <select onChange={picker} id="county" name="county">
              {countyNames}
            </select>
          </div>
        </nav>
      </div>

      <MapContainer center={[36.05, -103.04]} zoom={8} scrollWheelZoom={true}>
        <GeoJSON data={localCounties} style={style}/>
        <GeoJSON data={selectedGeo} style={styleTwo}/>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <Foot />
    </div>
  );
}
