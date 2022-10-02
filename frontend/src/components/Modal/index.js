import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearModal, hideModal } from '../../store/UX';

import './modal.css';

export default function Modal () {
  const dispatch = useDispatch();

  const showModal = useSelector(state => state.UX.showModal);
  const modalMooring = useSelector(state => state.UX.modalMooring);
  const Current = useSelector(state => state.UX.currentModal);

  const resist = e => {
    e.stopPropagation();
  };

  const clearAndClose = () => {
    dispatch(clearModal());
    dispatch(hideModal());
  };

  useEffect(() => {
    const handleEscape = ({ keyCode }) => {
      if (keyCode === 27) {
        dispatch(clearModal());
        dispatch(hideModal());
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [dispatch]);

  return showModal && Current && createPortal(
    <div
      id='modal-background'
      onClick={clearAndClose}
    >
      <div
        id='modal-content'
        onClick={resist}
      >
        <button
          className='modal-floater top-right'
          onClick={clearAndClose}
        >
          X
        </button>
        <Current />
      </div>
    </div>,
    modalMooring
  );
}
