/* eslint-disable no-extend-native */

Array.prototype.indexed = function (key) {
  return this.reduce((acc, next) => {
    acc[next[key]] = next;
    return acc;
  }, {});
};
