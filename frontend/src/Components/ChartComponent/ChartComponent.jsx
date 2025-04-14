import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardCharts = () => {
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Revenue',
        data: [1000, 1500, 1200, 1800, 1700, 2000, 2200],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const barData = {
    labels: ['Product A', 'Product B', 'Product C', 'Product D'],
    datasets: [
      {
        label: 'Sales',
        data: [300, 450, 700, 500],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const doughnutData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        data: [300, 500, 200],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Revenue Trends</h2>
        <div className="h-[200px]">
          <Line data={lineData} options={options} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Sales Distribution</h2>
        <div className="h-[200px]">
          <Bar data={barData} options={options} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">User Demographics</h2>
        <div className="h-[200px]">
          <Doughnut data={doughnutData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
