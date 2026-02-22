import {
  moveUpward,
  isArray,
  isNumber,
  moveDownward,
  extractLowestSetBit,
} from "./utils";
import { SumGroup } from "./monoid";

/**
 * Binary Indexed Tree (Fenwick Tree)
 *
 * Fenwick Tree is a data structure that provides efficient methods for cummulative frequency tables. It allows both updates and prefix queries.
 *
 * Public API uses 0-based indexing to make it more intuitive.
 * But, values will be stored in 1-based arrays to simplify implementation.
 *
 * Logic Overview:
 * - Each index `i` in the internal 1-based array stores the sum of a range.
 * - The length of that range is determined by the "Least Significant Bit" (LSB) of `i`.
 * - To get the next index to update: `i += i & -i`
 * - To get the parent index for a prefix sum: `i -= i & -i`
 * * Space Complexity: O(n)
 */
export class BinaryIndexedTree {
  /**
   * @param {number|ArrayList<any>} sizeOrArrayLike
   * - If number: create an empty tree of given size.
   * - If array-like: construct internal tree from passing values.
   *
   * @param {Object} group
   * * @param {(a:any,b:any)=>any} group.combine
   *  Associative binary operation.
   * @param {any} group.identity
   *  Identity element for combine.
   * @param {(x:any)=>any} group.inverse
   *  Inverse function (must satisfy combine(x, inverse(x)) = identity).
   * @time O(n) or (O(n log n)) depending on initialization strategy.
   */
  constructor(sizeOrArrayLike, group = SumGroup) {
    const { combine, identity, inverse } = group;

    if (typeof combine !== "function") {
      throw new TypeError("combine must be a function.");
    }

    if (typeof inverse !== "function") {
      throw new TypeError("inverse must be a function.");
    }

    this.combine = combine;
    this.identity = identity;
    this.inverse = inverse;

    if (isNumber(sizeOrArrayLike)) {
      this.n = sizeOrArrayLike;

      /**
       * The internal storage for the Fenwick Tree.
       * Using 1-based indexing internally.
       * `tree[i]` stores combined result of the range `[i - LSB(i) + 1, i]`
       */
      this.tree = new Array(this.n + 1).fill(this.identity);
    } else if (isArray(sizeOrArrayLike)) {
      this.n = sizeOrArrayLike.length;
      this.tree = new Array(this.n + 1).fill(this.identity);
      for (let i = 0; i < this.n; i += 1) {
        this.update(i, sizeOrArrayLike[i]);
      }
    } else {
      throw new TypeError("First argument must be of type number or array.");
    }
  }

  /**
   * Returns the inclusive range [start, end] covered by internal node at index `idx`.
   *
   * In Binary Indexed Tree, each index `idx` stores the arregated value over a range of size LSB(idx).
   * where LSB = extractLowestSetBit(idx).
   *
   * The covered range is:
   *  [idx - LSB(idx) + 1, idx]
   *
   * @param {number} idx - 1-based internal index
   * @returns {[number, number]} Inclusive range [start, end]
   *
   * @example
   * idx = 6 (binary 100)
   * LSB(6) = 2
   */
  getCoveredRangeFromIndex(idx) {
    return [idx - extractLowestSetBit(idx) + 1, idx];
  }

  /**
   * Calculate value at a specific index.
   *
   * @param {number} idx - index to update (0-based indexed).
   * @param {any} val - value to combine.
   * @time O(log n)
   */
  update(i, val) {
    let idx = i + 1;

    while (idx <= this.n) {
      this.tree[idx] = this.combine(this.tree[idx], val);
      idx = moveUpward(idx);
    }
  }

  /**
   * Returns prefix result over range [0, index].
   * @param index - 0-based indexing (inclusive).
   * @returns The cummulative result in the range [0, index].
   * @time O(log n)
   */
  query(idx) {
    let result = this.identity;
    idx = idx + 1;

    while (idx > 0) {
      result = this.combine(this.tree[idx], result);
      idx = moveDownward(idx);
    }
    return result;
  }

  /**
   * Returns prefix result over range [l, r].
   * @param {number} l - start of the range (0-based indexing, inclusive).
   * @param {number} r - end of the range (0-based indexing, inclusive).
   */
  rangeQuery(l, r) {
    if (l > r) return this.identity;
    return this.combine(this.query(r), this.inverse(this.query(l - 1)));
  }
}

BinaryIndexedTree.prototype.toString = function () {
  return this.tree;
};
