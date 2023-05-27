/* eslint-disable no-use-before-define */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import Links from './links';
import ButtonSts from './ButtonSts';

function Dashboard() {
  const [totalCount, setTotalUsersCount] = useState(0);
  const [totalProductsCount, setTotalProductsCount] = useState(0);
  const [totalSubscribersCount, setTotalSubscribersCount] = useState(0);
  const [totalOrdersCount, setTotalOrdersCount] = useState(0);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const [
            usersResponse,
            productsResponse,
            subscribersResponse,
            ordersResponse,
          ] = await Promise.all([
            axios.get(`${process.env.REACT_APP_SERVER_URL}/users/all`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${process.env.REACT_APP_SERVER_URL}/products`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${process.env.REACT_APP_SERVER_URL}/subscriber/all`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${process.env.REACT_APP_SERVER_URL}/checkout/orders`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

          const { totalCount: usersCount } = usersResponse.data;
          const { totalCount: productsCount } =
            productsResponse.data.allproducts;
          const subscribersCount = subscribersResponse.data.subscribers.length;
          const ordersCount = ordersResponse.data.orders.results.length;

          setTotalUsersCount(usersCount);
          setTotalProductsCount(productsCount);
          setTotalSubscribersCount(subscribersCount);
          setTotalOrdersCount(ordersCount);
        }
      } catch (error) {
        //
      }
    };

    fetchData();
  }, []);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    setSelectedYear(currentYear.toString());
    setSelectedMonth(currentMonth.toString());
    fetchDataByMonth();
  }, []);

  useEffect(() => {
    fetchDataByMonth();
  }, [selectedYear, selectedMonth]);

  const fetchDataByMonth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token && selectedYear && selectedMonth) {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/checkout/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              year: selectedYear,
              month: selectedMonth,
            },
          }
        );
        const { orders } = response.data;

        const startDate = new Date(selectedYear, selectedMonth - 1, 1);
        const endDate = new Date(selectedYear, selectedMonth, 0);
        const daysInMonth = endDate.getDate();
        const dateArray = Array.from(
          { length: daysInMonth },
          (_, index) => new Date(selectedYear, selectedMonth - 1, index + 1)
        );

        const chartDataOrders = [];
        const chartDataAmounts = [];

        dateArray.forEach((date) => {
          const ordersOnDate = orders.results.filter((order) => {
            const orderDate = new Date(order.createdAt);
            return (
              orderDate.getDate() === date.getDate() &&
              orderDate.getMonth() === date.getMonth() &&
              orderDate.getFullYear() === date.getFullYear()
            );
          });

          const dataPointOrders = {
            x: date.toLocaleDateString(),
            y: ordersOnDate.length,
          };

          const dataPointAmounts = {
            x: date.toLocaleDateString(),
            y: parseFloat(
              ordersOnDate
                .reduce(
                  (total, order) => total + parseFloat(order.totalAmount),
                  0
                )
                .toFixed(2)
            ),
          };

          chartDataOrders.push(dataPointOrders);
          chartDataAmounts.push(dataPointAmounts);
        });

        setChartData({
          datasets: [
            {
              label: 'Total Revenue',
              data: chartDataAmounts,
              borderColor: 'blue',
              backgroundColor: 'rgba(0, 0, 255, 0.2)',
            },
            {
              label: 'Total Orders',
              data: chartDataOrders,
              borderColor: 'green',
              backgroundColor: 'rgba(0, 255, 0, 0.2)',
            },
          ],
        });
      }
    } catch (error) {
      //
    }
  };

  const renderChart = () => {
    if (!chartData.datasets) {
      return null;
    }

    return <Line data={chartData} data-testid="line-chart" />;
  };

  return (
    <div className="containerx">
      <Links />
      <div className="content">
        <h2>Dashboard</h2>
        <ButtonSts
          totalCount={totalCount}
          totalProductsCount={totalProductsCount}
          totalSubscribersCount={totalSubscribersCount}
          totalOrdersCount={totalOrdersCount}
        />
        <div className="chart-container">
          <h2> Sales Chart</h2>
          <div className="filter-container">
            <select
              className="filter-select"
              value={selectedYear}
              onChange={handleYearChange}
              data-testid="Year"
            >
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
            <select
              className="filter-select"
              value={selectedMonth}
              onChange={handleMonthChange}
              data-testid="Month"
            >
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
          <div className="chart">{renderChart()}</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
