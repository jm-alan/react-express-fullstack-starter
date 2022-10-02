export default function paramKVParser (obj) {
  let res = '';
  for (const key in obj) {
    res += `&${key}=${obj[key]}`;
  }
  return res;
}
