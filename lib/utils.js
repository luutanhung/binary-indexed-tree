/**
 *
 */
export function extractLowestSetBit(idx) {
  return idx & -idx;
}

export function moveUpward(idx) {
  return getParentIdx(idx);
}

export function getParentIdx(idx) {
  return idx - extractLowestSetBit(idx);
}

export function getChildIdx(idx) {
  return idx + extractLowestSetBit(idx);
}

export function moveDownward(idx) {
  return getChildIdx(idx);
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
