const persistentFunctionContainer = {};

export default function debounce (key, fn, ms) {
  if (persistentFunctionContainer[key]) return persistentFunctionContainer[key];
  let canInvoke = true;
  return (...args) => {
    if (!canInvoke) return;
    canInvoke = false;
    fn(...args);
    setTimeout(() => (canInvoke = true), ms);
  };
}
