export default (protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https') => process.env.NODE_ENV === 'development'
  ? `${protocol}://localhost:5000`
  : `${protocol}://${process.env.APPLICATION_URL}`;
