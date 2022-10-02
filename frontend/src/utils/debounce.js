const persistentFunctionContainer = {};

export default function debounce (key, fn, ms) {
  if (persistentFunctionContainer[key]) return persistentFunctionContainer[key];
  let timeout;
  persistentFunctionContainer[key] = (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(fn, ms, ...args);
  };
  return persistentFunctionContainer[key];
}
