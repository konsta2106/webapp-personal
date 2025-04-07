"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const FuelPricesTampere = () => {
  const [fuelData, setFuelData] = useState({ stations: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFuelData = async () => {
      try {
        const response = await axios.get('/api/fuel/tampere');
        setFuelData(response.data);
      } catch (err) {
        setError('Failed to fetch fuel prices');
      } finally {
        setLoading(false);
      }
    };

    fetchFuelData();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading fuel prices...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Cheapest 95 Prices in Tampere</h3>
      <div className="row">
        {fuelData.stations.map((fuel, index) => (
          <div className="col-12 col-md-6 col-lg-4 mb-4" key={index}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{fuel.station}</h5>
                <p className="card-text"><strong>Price:</strong> {fuel.price} €/L</p>
                <p className="card-text"><strong>Last Updated:</strong> {fuel.updated}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FuelPricesTampere;
