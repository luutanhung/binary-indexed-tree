/**
 * Sum Group is useful for prefix sum / range sum.
 */
export const SumGroup = {
  combine: (a, b) => a + b,
  identity: 0,
  inverse: (x) => -x,
};

export const XORGroup = {
  combine: (a, b) => a ^ b,
  identity: 0,
  inverse: (x) => x, // self-inverse
};

/**
 * Modular addition group.
 */
export function createModGroup(mod) {
  if (typeof mod !== "number") {
    throw new TypeError("mod must be a number.");
  }

  return {
    combine: (a, b) => (a + b) % mod,
    identity: 0,
    inverse: (x) => (mod - (x % mod)) % mod,
  };
}
