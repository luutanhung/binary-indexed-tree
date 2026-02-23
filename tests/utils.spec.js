import { beforeEach, describe, expect, test } from "vitest";

import {
  extractLowestSetBit,
  getBinary,
  moveDownward,
  moveUpward,
} from "../lib";

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
    console.log(getBinary(3));
    console.log("moveUpward(1)=", moveUpward(1), getBinary(moveUpward(1)));

    // [2 - LSD(2) + 1, 2];
    console.log("moveUpward(2)=", moveUpward(2), getBinary(moveUpward(2)));
    console.log("moveUpward(4)=", moveUpward(4), getBinary(moveUpward(4)));
  });

  test("move downward in bit", () => {
    console.log("Initial value for num:", num, getBinary(num));
    num = moveDownward(num);
    console.log("After moving downward:", num, getBinary(num));
  });
});
