/** A utility function for silencing expected erroneous output */
export const silenceAsync = async fn => {
  try {
    return await fn();
  } catch {}
};

export const silenceSync = fn => {
  try {
    return fn();
  } catch {}
};
