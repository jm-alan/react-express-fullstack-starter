/* eslint-disable no-extend-native */
Number.prototype.between = function (lowerBound = Number.MIN_VALUE, upperBound = Number.MAX_VALUE) {
  return this >= lowerBound && this <= upperBound;
};

Number.prototype._between$ = function (lowerBound = Number.MIN_VALUE, upperBound = Number.MAX_VALUE) {
  return this > lowerBound && this <= upperBound;
};

Number.prototype.$between_ = function (lowerBound = Number.MIN_VALUE, upperBound = Number.MAX_VALUE) {
  return this >= lowerBound && this < upperBound;
};

Number.prototype._between_ = function (lowerBound = Number.MIN_VALUE, upperBound = Number.MAX_VALUE) {
  return this > lowerBound && this < upperBound;
};
