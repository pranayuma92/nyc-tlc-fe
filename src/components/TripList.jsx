import React, { useMemo } from 'react';

const TripList = ({ data, listClick }) => {
	const tripdata = useMemo(() => data, [data]);

	return (
    <div id="layoutSidenav_nav">
      <nav class="sb-sidenav accordion" id="sidenavAccordion">
          <div class="sb-sidenav-menu">
              <div class="nav">
                  {
                    tripdata.map((trip, index) => (
                      <a key={index} class="nav-link" href="#!" onClick={() => listClick(trip)}>
                        Trip Route #{index+1}
                      </a>
                    ))
                  }
              </div>
          </div>
      </nav>
    </div>
	)
}

export default TripList;
