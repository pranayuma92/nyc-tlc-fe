import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import MapComponent from '../components/MapComponent';
import FareDistributionChart from '../components/FareDistributionChart';
import { getTrips } from '../services/api';
import TripFilter from '../components/TripFilter';
import FareAmountChart from '../components/FareAmountChart';
import TripList from '../components/TripList';

const Home = () => {
  const [tripsData, setTripsData] = useState([]);
  const [filters, setFilters] = useState({ startTime: '', endTime: '', minFare: 0, maxFare: 100 });
  const [singleTrip, setSingleTrip] = useState();

  useEffect(() => {
    getTrips(filters).then(data => setTripsData(data));
  }, [filters]);

  const handleListClick = (trip) => {
    const latLng = [
      { lat: trip.pickupLatitude, lng: trip.pickupLongitude },
      { lat: trip.dropoffLatitude, lng: trip.dropoffLongitude }
    ];

    setSingleTrip(latLng);
  }

  return (
    <>
      <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark"> 
        <a class="navbar-brand ps-3" href="index.html">NYC TLC Trip</a>
      </nav>
      <div id="layoutSidenav">
          <TripList data={tripsData}  listClick={handleListClick}/>
          <div id="layoutSidenav_content">
              <main>
                <div class="container-fluid p-4 h-100">
                  <TripFilter onFilterChange={(name, value) => setFilters({ ...filters, [name]: value })} />
                  <MapComponent tripsData={tripsData} latLng={singleTrip} />
                  <FareAmountChart dataTrip={tripsData} />
                </div>
              </main>
          </div>
      </div>
    </>
  );
};

export default Home;
