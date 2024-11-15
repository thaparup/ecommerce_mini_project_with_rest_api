import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent, useMapEvents } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { LeafletEvent, LeafletEventHandlerFnMap, map } from "leaflet";
import { useEffect, useMemo, useState } from "react";
import L from 'leaflet';


const Location = () => {
  // useEffect(() => {

  //   const successCallback = (position) => {
  //     console.log(position);
  //   };

  //   const errorCallback = (error) => {
  //     console.log(error);
  //   };

  //   navigator.geolocation.getCurrentPosition(successCallback, errorCallback);


  // }, [])

  const eventHandlers = useMemo(
    () => ({
      drag(event: LeafletEvent) {
        const successCallback = (position) => {
          console.log(position);
        };

        const errorCallback = (error) => {
          console.log(error);
        };

        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

      }
    }),
    []
  );



  return (
    <div>
      <MapContainer center={[51.505, -0.09]} zoom={27} scrollWheelZoom={false} className="w-[700px] h-[500px]">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]} draggable={true} eventHandlers={eventHandlers}>
          <Popup>
            I live here
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Location;




