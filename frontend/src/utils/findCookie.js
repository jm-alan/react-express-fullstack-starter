export default function findCookie (cookie) {
  const cookies = document.cookie.split(',');
  const found = cookies.filter(ck => ck.slice(0, cookie.length) === cookie)[0];
  return found ? found.slice(cookie.length + 1) : null;
}
