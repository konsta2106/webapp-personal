"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import dayjs from 'dayjs';

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
        colors: ['#0000FF'],
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
        colors: ['#1a73e8'],
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
    <div className="container mt-4">
      <h3 className="text-center mb-4">95 Fuel Price History - Tampere</h3>
      <Chart options={chartData.options} series={chartData.series} type="line" height={350} />
    </div>
  );
};

export default FuelPricesHistoryChart;
