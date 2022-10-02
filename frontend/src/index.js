import React, { lazy, Suspense, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';

import LoadingLock from './components/Loading/LoadingLock';
import store from './store';
import csrfetch from './utils/csrfetch';
import { setMooring } from './store/UX';

import './utils/prototypes';

const App = lazy(() => import('./App'));
const Modal = lazy(() => import('./components/Modal'));
const PageLoading = lazy(() => import('./components/Loading/PageLoading'));
const ErrorBanner = lazy(() => import('./components/ErrorBanner'));

if (process.env.NODE_ENV === 'development') {
  window.csrfetch = csrfetch;
}

const Root = () => {
  const dispatch = useDispatch();

  const mooringRef = useRef(null);

  useEffect(() => {
    dispatch(setMooring(mooringRef.current));
  }, [dispatch, mooringRef]);

  return (
    <>
      <Suspense fallback={<LoadingLock name='error banner' />}>
        <ErrorBanner />
      </Suspense>
      <Suspense fallback={<LoadingLock name='core app' />}>
        <App />
      </Suspense>
      <Suspense fallback={<LoadingLock name='modal' />}>
        <Modal />
      </Suspense>
      <PageLoading />
      <div ref={mooringRef} id='mooring' />
    </>
  );
};

const concurrentRoot = createRoot(document.getElementById('react-root'));
concurrentRoot.render(
  <Provider store={store}>
    <Root />
  </Provider>
);
