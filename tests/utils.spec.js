import { describe, test, expect } from "vitest";

import { getBinary, isolateLastBit } from "../src/utils";

describe("isolateLastBit", () => {
  test("isolate the last bit of index", () => {
    const num = 52;
    const isolated = isolateLastBit(num);
    expect(isolated).toBe(4);
  });
});
