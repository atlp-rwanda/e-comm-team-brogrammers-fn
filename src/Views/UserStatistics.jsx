import { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import BarChart from '../components/barGrath';
import { Rwf } from '../helpers/currency';

// const token = process.env.REACT_APP_TOKEN;

function Statistics() {
  const [token] = useState(localStorage.getItem('token'));
  const [productsApidata, setProductsApidata] = useState(null);
  const [start, setStart] = useState(
    moment().subtract(1, 'year').format('LLL')
  );
  const [end, setEnd] = useState(moment().format('LLL'));
  const [apidata, setApidata] = useState([]);
  const [graphRange, setGraphRange] = useState('year');
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/users/stats?start=${start}&end=${end}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => {
        setProductsApidata(data.data);
      });
  }, [start, end, token]);

  useEffect(() => {
    setEnd(moment().format('LLL'));
    setStart(moment().subtract(1, graphRange).format('LLL'));
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/users/stats/graph/${graphRange}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => {
        setApidata(data.data);
        console.log({ data: data.data });
      });
  }, [graphRange, token]);

  useEffect(() => {
    setGraphData({
      labels: apidata.map((data) => data.name),
      datasets: [
        {
          label: 'sold amount',
          data: apidata.map((data) => data.totalAmount),
          backgroundColor: '#0a4',
          borderColor: '#0a4',
        },
        {
          label: 'sold items',
          data: apidata.map((data) => data.items),
          backgroundColor: '#fa0',
          borderColor: '#fa0',
        },
      ],
    });
  }, [apidata]);

  return (
    <div>
      <div className="statistics">
        <div className="data">
          <h2>Statistics</h2>
          <form>
            <label htmlFor="selectTime">
              <span>select you time: </span>
              <select
                defaultValue={graphRange}
                onChange={(e) => setGraphRange(e.target.value)}
              >
                <option value="year">year</option>
                <option value="month">month</option>
                <option value="week">week</option>
                <option value="day">day</option>
              </select>
            </label>
            {/* <label>
              <span>Start: </span>
              <input type='date' name='start' />
            </label>
            <label>
              <span>End: </span>
              <input type='date' name='end' />
            </label>
            <button>Get Data</button>
            */}
          </form>
          <div className="summary">
            <h3>Overview</h3>
            <p>
              Total Sold Amount:{' '}
              <b>
                {productsApidata && Rwf.format(productsApidata?.revenue?.total)}
              </b>
            </p>
            <p>
              Total Sold Amount:{' '}
              <b>
                {productsApidata && Rwf.format(productsApidata?.revenue?.items)}
              </b>
            </p>
          </div>
          <ul className="top">
            <h3>Top sold products</h3>
            {productsApidata &&
              productsApidata !== null &&
              productsApidata.products
                .filter((p, i) => i < 3)
                .map((p) => (
                  <li key={p.id}>
                    <img alt={p.name} src={p.images[0]} />
                    <div>
                      <h4>{p.name}</h4>
                      <span>
                        Sold Amount: <b>{Rwf.format(p?.soldAmount)}</b>
                      </span>
                      <span>
                        Sold Items: <b>{p.soldQuantity}</b>
                      </span>
                    </div>
                  </li>
                ))}
          </ul>
        </div>
        <div className="graph">
          {graphData && graphData !== null ? (
            <BarChart
              data={graphData}
              options={{
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
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: `Prouduct status in this ${graphRange}`,
                  },
                },
                scales: {
                  y: {
                    ticks: {
                      color: '#eee',
                      font: {
                        size: 14,
                      },
                    },
                  },
                  x: {
                    ticks: {
                      color: '#eee',
                      font: {
                        size: 14,
                      },
                    },
                  },
                },
              }}
            />
          ) : undefined}
        </div>
      </div>
    </div>
  );
}

export default Statistics;
