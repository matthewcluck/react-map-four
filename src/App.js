import "./styles.css";
import { MapContainer, TileLayer, GeoJSON, useMap, flyTo } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React, { useState, useRef } from "react";
import Foot from "./Foot";
import counties from "./counties.json";

export default function App() {
  const [coordinates, setCoordinates] = React.useState([36.05, -103.04]);
  const [countyNames, setCountyNames] = React.useState([]);
  const [currentCounty, setCurrentCounty] = React.useState("Dallam");
  const [style, setStyle] = React.useState({ color: "grey" });
  const [styleTwo, setStyleTwo] = React.useState({ color: "yellow" });
  const [key, setKey] = React.useState(0);
  const localCounties = counties.features;
  const [selectedGeo, setSelectedGeo] = React.useState(counties.features[0]);

//Function ran when county selected. Loops through county list and retrieves index of selected county. Set the index on the top GeoJSON.
  function picker(e) {
    const pickedCounty = e.target.value;
    for (let i = 0; i < localCounties.length; i++) {
      if (localCounties[i].properties.name == pickedCounty) {
        setSelectedGeo(counties.features[i]);
      }
    }
    setCurrentCounty(pickedCounty);
    setKey(prevKey => prevKey + 1)
}

//Retrieve Texas Counties API
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
          <h1 id="title" className="title">
            Texas County Viewer
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

      <MapContainer center={[31.61, -98.84]} zoom={6} scrollWheelZoom={true}>
        {/* Background GeoJSON */}
        <GeoJSON data={localCounties} style={style}/>
        {/* Selected County GeoJSON. The Key prop allows us to re-render as we change it every time we run picker function */}
        <GeoJSON data={selectedGeo} style={styleTwo} key={key} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <Foot />
    </div>
  );
}
