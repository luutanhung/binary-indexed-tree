import { describe, test } from "vitest";

import { BinaryIndexedTree } from "../src";

describe("BinaryIndexedTree", () => {
  test("construct a binary indexed tree from an array-like structure", () => {
    const vals = [2, 4, 6, 8, 10];
    const bit = new BinaryIndexedTree(vals);
    console.log("vals:", vals);
    console.log("bit:", bit);
    console.log(bit.getCoveredRangeFromIndex(2));
    console.log("[0, 1]", bit.rangeQuery(0, 1));
    console.log("[1, 2]", bit.rangeQuery(1, 2));
    console.log("[2, 3]", bit.rangeQuery(2, 3));
    console.log("[3, 4]", bit.rangeQuery(3, 4));
    console.log("[0, 4]", bit.rangeQuery(0, 4));
  });
});
