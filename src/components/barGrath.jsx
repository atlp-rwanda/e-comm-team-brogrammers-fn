import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(...registerables);

export default function BarChart({ data, options }) {
  return (
    <Bar
      datasetIdKey="id"
      data={data}
      options={
        options || {
          responsive: true,
          plugins: {
            datalabels: {
              display: true,
              color: '#fa0',
              formatter: Math.round,
              anchor: 'end',
              offset: -20,
              align: 'start',
            },
            legend: {
              borderRadius: 100,
              position: 'bottom',
              labels: {
                usePointStyle: true,
                pointStyle: 'circle',
              },
            },
          },
          scales: {
            y: {
              ticks: {
                color: '#222',
                font: {
                  size: 14,
                },
              },
            },
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: '#222',
                font: {
                  size: 14,
                  weight: 'bold',
                },
              },
            },
          },
        }
      }
    />
  );
}
