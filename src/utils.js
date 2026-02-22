export function extractLowestSetBit(idx) {
  return idx & -idx;
}

export function moveUpward(idx) {
  return idx + extractLowestSetBit(idx);
}

export function moveDownward(idx) {
  return idx - extractLowestSetBit(idx);
}

export function getBinary(n) {
  return n.toString(2);
}

export function isArray(arr) {
  return Array.isArray(arr);
}

export function isNumber(n) {
  return typeof n === "number";
}
