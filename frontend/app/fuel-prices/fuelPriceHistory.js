"use client";  // Ensure this is at the very top

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import dayjs from 'dayjs';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const FuelPricesHistoryChart = () => {
  useEffect(() => {
    const fuelPricesHistory = async () => {
      try {
        const response = await axios.get('/api/fuel/tampere-history');
        const fuelPrices = response.data;
        const series = [
          {
            name: 'Average Price',
            data: fuelPrices.filter((object) => object.keskiarvo.length != 0 ).map((fuelPrice) => ({
              x: new Date(dayjs(fuelPrice.timestamp).format()).getTime(),
              y: fuelPrice.keskiarvo,
            })),
          },
        ];
        setChartData({ ...chartData, series });
      } catch (error) {
        console.log(error);
      }
    }
    fuelPricesHistory();
  }, []);

  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'line',
        height: 350,
      },
      stroke: {
        show: true,
        width: 2,
        curve: 'smooth',
        colors: ['#0000FF'],
      },
      xaxis: {
        type: 'datetime',
        min: dayjs().subtract(2, 'weeks').valueOf(), // Set initial min to 2 weeks ago
        max: dayjs().valueOf(), // Set initial max to today
        // labels: {
        //   formatter: (value) => dayjs(value).format('DD.MM'), // Format x-axis labels
        // }
      },
      yaxis: {
        title: {
          text: 'Price (€)',
        },
      },
      // tooltip: {
      //   x: {
      //     formatter: (value) => dayjs(value).format('DD.MM'), // Format tooltip dates
      //   },
      //   theme: 'dark',
      // },
      markers: {
        size: 5,
        colors: ['#1a73e8'],
        strokeColors: '#fff',
        strokeWidth: 2,
        hover: {
          size: 7,
        },
      }
    },
  });

  return (
    <div>
      <h3>95 Fuel Price History - Tampere</h3>
      <Chart options={chartData.options} series={chartData.series} type="line" height={350} />
    </div>
  );
};

export default FuelPricesHistoryChart;