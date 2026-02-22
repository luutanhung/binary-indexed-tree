export function isolateLastBit(idx) {
  return idx & -idx;
}

export function getBinary(n) {
  return n.toString(2);
}
