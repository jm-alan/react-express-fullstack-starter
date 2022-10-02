import React, { lazy, useEffect, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import LoadingLock from './components/Loading/LoadingLock';
import { restore } from './store/session';

import './index.css';

const Home = lazy(() => import('./components/Home'));
const NavBar = lazy(() => import('./components/NavBar'));
const LoginForm = lazy(() => import('./components/Auth/LoginForm'));
const SignupForm = lazy(() => import('./components/Auth/SignupForm'));

export default function App () {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restore());
  }, [dispatch]);

  useEffect(() => {
    const tempLoading = document.getElementById('loading-temp');
    if (tempLoading) {
      tempLoading.parentElement.removeChild(tempLoading);
    }
  }, []);

  return (
    <BrowserRouter>
      <div id='main'>
        <div id='router-container'>
          <Routes>
            <Route
              path='/'
              element={<Navigate to='/home' />}
            />
            <Route
              path='/home'
              element={(
                <Suspense fallback={<LoadingLock name='home' />}>
                  <Home />
                </Suspense>
            )}
            />
            <Route
              path='/login'
              element={(
                <Suspense fallback={<LoadingLock name='login' />}>
                  <LoginForm />
                </Suspense>
            )}
            />
            <Route
              path='/signup'
              element={(
                <Suspense fallback={<LoadingLock name='signup' />}>
                  <SignupForm />
                </Suspense>
            )}
            />
          </Routes>
        </div>
        <Suspense fallback={<LoadingLock name='navbar' />}>
          <NavBar />
        </Suspense>
      </div>
    </BrowserRouter>
  );
}
