/* eslint-disable no-extend-native */

Array.prototype.unique = function () {
  const uniqueSet = new Set();
  this.forEach(el => !uniqueSet.has(el) && uniqueSet.add(el));
  return Array.from(uniqueSet);
};
