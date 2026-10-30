import { describe, expect, it } from "vitest";
import { calculateMissedRevenue } from "./revenueCalculator";

const example = { inquiries: "100", unfollowed: "30", closeRate: "20", saleValue: "500" };

describe("calculateMissedRevenue", () => {
  it("estimates the neglected leads that could close, rather than all neglected leads", () => {
    expect(calculateMissedRevenue(example)).toEqual({ ok: true, monthlyOpportunity: 3000, neglectedLeads: 30 });
  });

  it("accepts zero and 100 percent boundaries", () => {
    expect(calculateMissedRevenue({ ...example, inquiries: "0" })).toMatchObject({ ok: true, monthlyOpportunity: 0 });
    expect(calculateMissedRevenue({ ...example, unfollowed: "100", closeRate: "100" })).toMatchObject({ ok: true, monthlyOpportunity: 50000 });
  });

  it.each(["", " ", "-1", "NaN", "Infinity", "1e309", "1000001", "1,000"])("rejects invalid inquiry input %j", (inquiries) => {
    expect(calculateMissedRevenue({ ...example, inquiries })).toMatchObject({ ok: false, errors: { inquiries: expect.any(String) } });
  });

  it("rejects percentages over 100 and excessive sale values", () => {
    expect(calculateMissedRevenue({ ...example, unfollowed: "101", closeRate: "100.1", saleValue: "1000000001" })).toMatchObject({ ok: false, errors: { unfollowed: expect.any(String), closeRate: expect.any(String), saleValue: expect.any(String) } });
  });

  it("uses decimal sale values and estimates without rounding intermediate steps", () => {
    expect(calculateMissedRevenue({ inquiries: "10", unfollowed: "25", closeRate: "10", saleValue: "99.99" })).toMatchObject({ ok: true, monthlyOpportunity: 24.9975 });
  });
});
