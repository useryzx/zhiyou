function gcd(m, n) {
  if (typeof m != 'number' || typeof n != 'number') throw new Error();
  if (m % 1 != 0 || n % 1 != 0) throw new Error();
  let y = m % n;
  while (y != 0) {
    m = n;
    n = y;
    y = m % n;
  }
  return n;
}
module.exports = gcd;