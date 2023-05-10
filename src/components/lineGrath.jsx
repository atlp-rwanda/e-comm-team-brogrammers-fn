// eslint-disable-next-line import/no-extraneous-dependencies
import { Line } from 'react-chartjs-2';
// eslint-disable-next-line import/no-extraneous-dependencies, no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto';

export default function LineChart({ data, options }) {
  return <Line data={data} options={options} />;
}
