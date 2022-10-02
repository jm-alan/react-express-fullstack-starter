module.exports = (key, obj) => Object
  .getOwnPropertySymbols(obj)
  .filter(symbolKey => symbolKey.toString() === `Symbol(${key})`)[0] || null;
