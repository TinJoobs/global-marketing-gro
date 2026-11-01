import { describe, expect, it } from "vitest";
import { slotsToOptions } from "./booking";
describe("availability parsing", () => {
  it("ignores invalid/past slots, removes duplicate instants and sorts across timezones", () => {
    expect(
      slotsToOptions({
        "2030-12-02": {
          slots: [
            "bad",
            "2030-12-02T09:00:00-05:00",
            "2030-12-02T10:00:00Z",
            "2030-12-02T14:00:00Z",
            "2020-01-01T10:00:00Z",
          ],
        },
      }).map((x) => x.iso),
    ).toEqual(["2030-12-02T10:00:00Z", "2030-12-02T09:00:00-05:00"]);
  });
  it("accepts malformed empty responses without crashing", () => {
    expect(slotsToOptions(null)).toEqual([]);
    expect(slotsToOptions({ unexpected: { slots: "not-an-array" } })).toEqual(
      [],
    );
  });
});
