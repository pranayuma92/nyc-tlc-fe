import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "#fff", border: "1px solid #ccc", padding: "10px" }}>
        <p>{`${payload[0].payload.fareRange} Fare Range`}</p>
        <p style={{ color: "#8884d8" }}>
          {`${payload[0].value.toLocaleString()} taxi trip records`}
        </p>
      </div>
    );
  }
  return null;
};

const FareAmountChart = ({ dataTrip }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
      const aggregateFareAmounts = (trips) => {
        const fareRanges = [
          { range: "0-5", min: 0, max: 5, count: 0 },
          { range: "5-10", min: 5, max: 10, count: 0 },
          { range: "10-20", min: 10, max: 20, count: 0 },
          { range: "20-50", min: 20, max: 50, count: 0 },
          { range: "50+", min: 50, max: Infinity, count: 0 },
        ];

        trips.forEach((trip) => {
          const fare = trip.fareAmount;
          fareRanges.forEach((bin) => {
            if (fare >= bin.min && fare < bin.max) {
              bin.count += 1;
            }
          });
        });

        return fareRanges.map((bin) => ({ fareRange: bin.range, count: bin.count }));
      };
  
        const aggregatedData = aggregateFareAmounts(dataTrip);
        setData(aggregatedData);
    
  }, [dataTrip]);

  return (
    <div className="mt-3">
      <h4>Fare Amount</h4>
      <ResponsiveContainer width="100%" height={400} className="mt-3">
        <BarChart layout="vertical" data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis type="number" tickFormatter={(value) => `${value}M`} />
          <YAxis type="category" dataKey="fareRange" />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FareAmountChart;
