import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LogsThunk from '../redux/features/actions/logs';
import '../LogsComponent.scss';

function LogsComponent() {
  const dispatch = useDispatch();
  const { results } = useSelector((state) => state.logs);

  useEffect(() => {
    dispatch(LogsThunk());
  }, [dispatch]);
  return (
    <div className="logs-container">
      <table className="logs-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Time</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {results.map((logs) => (
            <tr key={logs.id}>
              <td>{logs.user.username}</td>
              <td>{logs.createdAt}</td>
              <td>{logs.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LogsComponent;
