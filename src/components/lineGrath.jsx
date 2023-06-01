/* eslint-disable no-unused-vars */
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

export default function LineChart({ data, options }) {
  return <Line data={data} options={options} />;
}
