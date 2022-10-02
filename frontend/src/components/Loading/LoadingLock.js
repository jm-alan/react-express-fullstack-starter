import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { lockLoading, unlockLoading } from '../../store/UX';

export default function LoadingLock ({ name, children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Loading lock added by', name);
    }
    dispatch(lockLoading(name, children));
    return () => {
      if (process.env.NODE_ENV === 'development') {
        console.log('Loading lock released by', name);
      }
      dispatch(unlockLoading(name));
    };
  }, [dispatch, name, children]);

  return null;
}
