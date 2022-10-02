/* eslint-disable no-extend-native */

Array.prototype.mapInPlace = function (transformer) {
  for (let i = 0; i < this.length; i++) {
    this[i] = transformer(this[i], i, this);
  }
};
