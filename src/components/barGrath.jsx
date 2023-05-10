/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Bar } from 'react-chartjs-2';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto';
import { useRef } from 'react';

export default function BarChart({ data, options }) {
  const chartRef = useRef();
  return <Bar ref={chartRef} data={data} options={options} />;
}
