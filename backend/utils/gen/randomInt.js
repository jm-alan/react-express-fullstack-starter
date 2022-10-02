module.exports = (
  lowerBound = Number.MIN_SAFE_INTEGER,
  upperBound = Number.MAX_SAFE_INTEGER
) => Math.round((Math.random() * (upperBound - lowerBound))) + lowerBound;
