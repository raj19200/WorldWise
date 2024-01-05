/* eslint-disable react/prop-types */
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/cityContext";
import { useNavigate } from "react-router-dom";
import { UseGeoLoaction } from "../hooks/UseGeoLoaction";

import Button from "./Button";
import { UseUrlPosition } from "../hooks/UseUrlPosition";
function Map() {
  const { city } = useCities();

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = UseGeoLoaction();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [lat, lng] = UseUrlPosition();
  useEffect(
    function () {
      if (lat && lng) setMapPosition([lat, lng]);
    },
    [lat, lng]
  );
  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {city.map((data) => (
          <Marker
            position={[data.position.lat, data.position.lng]}
            key={data.id}
          >
            <Popup>
              <span>{data.emoji}</span> <span>{data.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectCity />
      </MapContainer>
    </div>
  );
}
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectCity() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
