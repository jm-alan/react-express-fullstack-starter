export const SET_CURRENT = 'errors/CURRENT';
export const CLEAR_ERRORS = 'errors/CLEAR';

export const setErrors = current => ({
  type: SET_CURRENT,
  current
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});

export const oops = () => ({
  type: SET_CURRENT,
  current: [
    'Sorry, something went wrong',
    'Please refresh the page and try again'
  ]
});

export default function reducer (
  state = { current: [] },
  { type, current }
) {
  switch (type) {
    case SET_CURRENT:
      return {
        current
      };
    case CLEAR_ERRORS:
      return {
        current: []
      };
    default:
      return state;
  }
}
