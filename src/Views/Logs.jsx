import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import LogsThunk from '../redux/features/actions/logs';
import PaginationButtons from '../components/paginationbuttons';
import Links from './admin/links';

function LogsComponent() {
  const dispatch = useDispatch();
  const { results } = useSelector((state) => state.logs);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    dispatch(LogsThunk());
  }, [dispatch]);

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const year = dateTime.getFullYear();
    const hour = String(dateTime.getHours()).padStart(2, '0');
    const minute = String(dateTime.getMinutes()).padStart(2, '0');

    return `${month}/${day}/${year} ${hour}:${minute}`;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = results.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="containerx">
      <Links />
      <div className="content">
        <div className="upper">
          <h2>B-Mall Activity Logs</h2>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Activity Done</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((logs) => (
                <tr key={logs.id}>
                  <td data-label="Time">{formatDateTime(logs.createdAt)}</td>
                  <td data-label="Username">{logs.user.username}</td>
                  <td data-label="Email">{logs.user.email}</td>
                  <td data-label="Role">{logs.user.role}</td>
                  <td data-label="Activity">{logs.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <PaginationButtons
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={Math.ceil(results.length / rowsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default LogsComponent;
