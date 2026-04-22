"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col } from 'react-bootstrap';

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
    <section className="my-5 py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <h1 className="section-title mb-5">Cheapest 95 Prices in Tampere</h1>
        <Row className="mt-4 g-4">
          {fuelData.stations.map((fuel, index) => (
            <Col xs={12} md={6} lg={4} key={index}>
              <Card 
                className="h-100 fuel-card" 
                style={{ 
                  border: 'none', 
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
                  transition: 'transform 0.2s, box-shadow 0.2s' 
                }}
              >
                <Card.Body>
                  <Card.Title style={{ 
                    color: 'var(--primary-orange)', 
                    fontWeight: '600', 
                    fontSize: '1.2rem',
                    marginBottom: '1rem' 
                  }}>
                    {fuel.station}
                  </Card.Title>
                  <p className="card-text" style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                    <strong>Price:</strong> {fuel.price} €/L
                  </p>
                  <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>
                    <strong>Updated:</strong> {fuel.updated}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default FuelPricesTampere;
