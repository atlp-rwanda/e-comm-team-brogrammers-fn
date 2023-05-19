/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { MdNotifications } from 'react-icons/md';
import {
  AiFillCloseCircle,
  //   AiOutlineArrowLeft,
  //   AiOutlineArrowRight,
} from 'react-icons/ai';
import './NotificationPane.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import fetchNotifications from '../../redux/features/actions/notifications';
import axios from '../../redux/configs/axios';

export function Notification({ markAs, note }) {
  return (
    <div
      data-testid="note"
      className={`note ${note.isRead ? '' : 'note-unread'}`}
    >
      <div className="note-header">{note.type}</div>
      <p className="note-text">{note.message}</p>

      <div className="note-btns">
        {!note.isRead && (
          <button
            data-testid="note-read"
            onClick={() => markAs(note.id)}
            type="button"
          >
            Mark as read
          </button>
        )}
        {note.isRead && (
          <button
            data-testid="note-unread"
            onClick={() => markAs(note.id, 'unread')}
            type="button"
          >
            Mark as unread
          </button>
        )}
      </div>
    </div>
  );
}

function NotificationPane() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const {
    notifications: { results = [] },
  } = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    setNotes(results.slice(page, page + 5));
  }, [results, page]);

  const markAs = async (id, action = 'read') => {
    const promise = axios.post(
      `/notification/${action}${id ? `/${id}` : ''}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      }
    );

    toast
      .promise(promise, {
        loading: `Marking as ${action}`,
        success: `Marked as ${action}`,
        error: `Failed to markd as ${action}`,
      })
      .finally(() => {
        dispatch(fetchNotifications(page));
      });
  };

  return (
    <>
      <button
        type="button"
        data-testid="note-icon"
        className="note-icon"
        onClick={() => setOpen(true)}
      >
        <MdNotifications />
        <span className="note-icon-badge">
          {notes.filter((no) => !no.isRead).length}
        </span>
      </button>
      <div
        data-testid="notification-pane"
        onClick={() => setOpen(false)}
        style={{ display: open ? 'flex' : 'none' }}
        className="note-pane"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="note-pane-close"
          data-testid="note-pane-close"
        >
          <AiFillCloseCircle />
        </button>
        <div onClick={(e) => e.stopPropagation()} className="note-list">
          <div className="note-list-head">
            <h4 className="note-list-header">Notifications</h4>
            <button
              data-testid="mark-all-as-read"
              onClick={() => markAs(undefined, 'read/all')}
              type="button"
            >
              Mark all as read
            </button>
          </div>
          {notes.map((note) => (
            <Notification markAs={markAs} note={note} key={note.id} />
          ))}
          {notes.length === 0 && (
            <div
              data-testid="no-notes"
              style={{
                color: 'white',
                borderRadius: '.5rem',
                marginTop: '1rem',
                marginBottom: '1rem',
                backgroundColor: 'gray',
                padding: '1rem',
              }}
            >
              No notifications
            </div>
          )}
          {(page > 1 || notes.length > 0) && (
            <div className="note-paginate">
              {page > 1 && (
                <button onClick={() => setPage((p) => p - 1)} type="button">
                  &larr;
                  <span>prev</span>
                </button>
              )}
              {notes.length > 0 && (
                <button onClick={() => setPage((p) => p + 1)} type="button">
                  {/* <AiOutlineArrowRight /> */}
                  {/* &arrr; */}
                  <span>Next</span>
                  &rarr;
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default NotificationPane;
