module.exports = cookieString => cookieString
  .split(/;\s?/)
  .map(cookieKV => cookieKV.split('='))
  .reduce((acc, [key, val]) => {
    acc[key] = val;
    return acc;
  }, {});
