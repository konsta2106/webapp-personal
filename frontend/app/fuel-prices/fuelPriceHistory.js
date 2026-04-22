"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import dayjs from 'dayjs';
import { Card } from 'react-bootstrap';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const FuelPricesHistoryChart = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: { type: 'line', height: 350 },
      stroke: {
        show: true,
        width: 2,
        curve: 'smooth',
        colors: ['#f9ab00'],
      },
      xaxis: {
        type: 'datetime',
        min: dayjs().subtract(2, 'weeks').valueOf(),
        max: dayjs().valueOf(),
      },
      yaxis: {
        title: { text: 'Price (€)' },
      },
      markers: {
        size: 5,
        colors: ['#f9ab00'],
        strokeColors: '#fff',
        strokeWidth: 2,
        hover: { size: 7 },
      },
    },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fuelPricesHistory = async () => {
      try {
        const response = await axios.get('/api/fuel/tampere-history');
        const fuelPrices = response.data;
        const series = [
          {
            name: 'Average Price',
            data: fuelPrices
              .filter(obj => obj.keskiarvo.length !== 0)
              .map(fuelPrice => ({
                x: new Date(dayjs(fuelPrice.timestamp).format()).getTime(),
                y: fuelPrice.keskiarvo,
              })),
          },
        ];
        setChartData(prev => ({ ...prev, series }));
      } catch (err) {
        setError('Failed to load fuel price history');
      } finally {
        setLoading(false);
      }
    };

    fuelPricesHistory();
  }, []);

  if (loading) {
    return <div className="text-center mt-4">Loading chart...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-danger">{error}</div>;
  }

  return (
    <section className="my-5 py-5">
      <div className="container">
        <h1 className="section-title mb-5">95 Fuel Price History - Tampere</h1>
        <Card style={{ border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <Card.Body className="p-4">
            <Chart options={chartData.options} series={chartData.series} type="line" height={350} />
          </Card.Body>
        </Card>
      </div>
    </section>
  );
};

export default FuelPricesHistoryChart;
