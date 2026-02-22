import { beforeEach, describe, expect, test } from "vitest";

import {
  extractLowestSetBit,
  getBinary,
  moveDownward,
  moveUpward,
} from "../src";

describe("isolateLastBit", () => {
  let num;

  beforeEach(() => {
    num = 52;
  });

  test("isolate the last bit of index", () => {
    const lowestSetBit = extractLowestSetBit(num);
    expect(lowestSetBit).toBe(4);
  });

  test("move upward in bit", () => {
    console.log("Initial value for num:", num, getBinary(num));
    num = moveUpward(num);
    console.log("After moving upward:", num, getBinary(num));
  });

  test("move downward in bit", () => {
    console.log("Initial value for num:", num, getBinary(num));
    num = moveDownward(num);
    console.log("After moving downward:", num, getBinary(num));
  });
});
