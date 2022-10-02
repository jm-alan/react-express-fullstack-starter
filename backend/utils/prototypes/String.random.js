/* eslint-disable no-extend-native */

const randomInt = require('../gen/randomInt');

String.random = function (nChars = 1) {
  nChars = Math.max(nChars, 0);
  let res = '';
  for (let i = 0; i < nChars; i++) {
    res += String.fromCharCode(randomInt(32, 126));
  }
  return res;
};

String.random.letters = function (nChars = 1) {
  nChars = Math.max(nChars, 0);
  let res = '';
  for (let i = 0; i < nChars; i++) {
    res += String.fromCharCode(
      [
        randomInt(65, 65 + 25),
        randomInt(97, 97 + 25)
      ][randomInt(0, 1)]
    );
  }
  return res;
};

String.random.numbers = function (nChars = 1) {
  nChars = Math.max(nChars, 0);
  let res = '';
  for (let i = 0; i < nChars; i++) {
    res += String.fromCharCode(randomInt(48, 57));
  }
  return res;
};

let lettersAndNumbers = '0123456789';
for (let i = 0; i < 26; i++) lettersAndNumbers += String.fromCharCode(65 + i);
for (let i = 0; i < 26; i++) lettersAndNumbers += String.fromCharCode(97 + i);

String.random.lettersAndNumbers = function (nChars = 1) {
  nChars = Math.max(nChars, 0);
  let res = '';
  for (let i = 0; i < nChars; i++) {
    res += lettersAndNumbers[randomInt(0, 61)];
  }
  return res;
};

const randomSyms = [];
for (let i = 32; i < 48; i++) {
  randomSyms.push(String.fromCharCode(i));
}
for (let i = 58; i < 65; i++) {
  randomSyms.push(String.fromCharCode(i));
}
for (let i = 91; i < 97; i++) {
  randomSyms.push(String.fromCharCode(i));
}
randomSyms.push('{', '|', '}');
const symsBound = randomSyms.length - 1;

String.random.symbols = function (nChars = 1) {
  nChars = Math.max(nChars, 0);
  let res = '';
  for (let i = 0; i < nChars; i++) {
    res += randomSyms[randomInt(0, symsBound)];
  }
  return res;
};
