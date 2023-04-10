import "./styles.css";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import Head from "./Head";
import Foot from "./Foot";

export default function App() {
  const [coordinates, setCoordinates] = React.useState([31.56, -98.97]);
  
  return (
    <div className="App">
      <Head />
      <MapContainer center={coordinates} zoom={6} scrollWheelZoom={true}>
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <Foot />
    </div>
  );
}
