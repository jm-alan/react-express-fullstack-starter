import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearErrors } from '../../store/errors';
import { hideErrors } from '../../store/UX';

import './errorBanner.css';

export default function ErrorBanner () {
  const dispatch = useDispatch();

  const showErrors = useSelector(state => state.UX.showErrors);
  const currentErrors = useSelector(state => state.errors.current);

  const clearAndClose = () => {
    dispatch(clearErrors());
    dispatch(hideErrors());
  };

  return showErrors
    ? (
      <div id='error-banner'>
        <div id='scrolling-error-container'>
          {currentErrors.map((err, idx) => (
            <div
              className='error'
              key={idx}
            >
              {err}
            </div>
          ))}
        </div>
        <div
          id='error-banner-close'
          onClick={clearAndClose}
        >
          X
        </div>
      </div>
      )
    : null;
}
