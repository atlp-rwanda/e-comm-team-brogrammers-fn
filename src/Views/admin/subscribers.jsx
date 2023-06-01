import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Pagination from '../../components/paginationbuttons';
import Links from './links';
import { getSubscribersThunk } from '../../redux/features/actions/subscribe';

function AdminSubscribe() {
  const dispatch = useDispatch();
  const {
    data: { results: data, totalPages, error },
  } = useSelector((state) => state.subscribers);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getSubscribersThunk({ page: currentPage }));
  }, [currentPage]);

  return (
    <div className="containerx">
      <Links />
      <div className="content">
        {error?.isError ? (
          <div className="error">{error?.message}</div>
        ) : (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Full Name</th>
                  <th>Subscribed at</th>
                  <th>Verified</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <td colSpan="2000" className="error">
                    No subscriber found
                  </td>
                ) : (
                  data.map((item) => (
                    <tr key={item.id}>
                      <td data-label="Email">{item.email}</td>
                      <td data-label="full name">{`${item.firstName} ${item.lastName}`}</td>
                      <td data-label="subscribed at">
                        {moment(item.createdAt).format('LL')}
                      </td>
                      <td data-label="Verified">
                        <span
                          className={
                            item.subscribed ? 'verified' : 'not-verified'
                          }
                        >
                          {item.subscribed ? 'True' : 'False'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminSubscribe;
