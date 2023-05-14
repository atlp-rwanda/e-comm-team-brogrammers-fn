/* eslint-disable no-plusplus */
import React from 'react';

function ProgressBar({ review, status }) {
  if (
    !review ||
    !review.allReviews.results ||
    review.allReviews.results.length === 0
  ) {
    return null; // or render some loading indicator
  }

  const fiveStarPercentage =
    (review.totalRates[5] / review.allReviews.results.length) * 100 || 0;
  const fourStarPercentage =
    (review.totalRates[4] / review.allReviews.results.length) * 100 || 0;
  const threeStarPercentage =
    (review.totalRates[3] / review.allReviews.results.length) * 100 || 0;
  const twoStarPercentage =
    (review.totalRates[2] / review.allReviews.results.length) * 100 || 0;
  const oneStarPercentage =
    (review.totalRates[1] / review.allReviews.results.length) * 100 || 0;

  return (
    <div className="reviewRender">
      {status === 'loading' || !review ? (
        <p>loading</p>
      ) : (
        <>
          <div className="rate">
            <div className="number">
              <p>5</p>{' '}
            </div>

            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${fiveStarPercentage}%` }}
              />
            </div>
          </div>

          <div className="rate">
            <div className="number">
              <p>4</p>{' '}
            </div>

            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${fourStarPercentage}%` }}
              />
            </div>
          </div>
          <div className="rate">
            <div className="number">
              <p>3</p>{' '}
            </div>

            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${threeStarPercentage}%` }}
              />
            </div>
          </div>
          <div className="rate">
            <div className="number">
              <p>2</p>{' '}
            </div>

            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${twoStarPercentage}%` }}
              />
            </div>
          </div>
          <div className="rate">
            <div className="number">
              <p>1</p>{' '}
            </div>

            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${oneStarPercentage}%` }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default ProgressBar;
