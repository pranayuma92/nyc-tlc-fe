import React, { useEffect, useRef, useMemo, useState } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import '../assets/Control.Geocoder.js'
import '../assets/config.js'

import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'


const MapComponent = ({ tripsData, latLng }) => {
  const [map, setMap] = useState();
  const mapRef = useRef();

  const mapStyles = {
    overflow: 'hidden',
    width: '100%',
    height: '100vh',
  };

  const waypoints = useMemo(() => {
    if (latLng) return latLng;

    return tripsData.slice(0, 200).reduce((acc, trip) => {
      const { pickupLatitude, pickupLongitude, dropoffLatitude, dropoffLongitude } = trip;

      if (pickupLatitude && pickupLongitude) {
        acc.push(L.latLng(pickupLatitude, pickupLongitude));
      }

      if (dropoffLatitude && dropoffLongitude) {
        acc.push(L.latLng(dropoffLatitude, dropoffLongitude));
      }

      return acc;
    }, []);
  }, [tripsData, latLng]);


  useEffect(() => {
    mapRef.current = L.map('map');

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapRef.current);

    const control = L.Routing.control(L.extend(window.lrmConfig, {
      waypoints: waypoints,
      draggableWaypoints: false,
      routeWhileDragging: false,
      createMarker: () => { return null; },
      lineOptions: {
        addWaypoints: false,
        styles: [{ color: '#f00', weight: 2 }]
      }
    })).addTo(mapRef.current);

    L.Routing.errorControl(control).addTo(mapRef.current);

    return () => {
      mapRef.current.remove();
    }
  }, [waypoints]);

  return (
    <div id="map" class="map" ref={mapRef} style={mapStyles}></div>
  );
};

export default MapComponent;
