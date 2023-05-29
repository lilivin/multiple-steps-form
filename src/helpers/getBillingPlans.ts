import billingPlansData from "../data/billingPlans.json";

export interface BillingPlan {
  name: string;
  monthly: number;
  yearly: number;
}

export interface BillingPlans {
  [key: string]: BillingPlan;
}

export function getBillingPlanById(id: string): BillingPlan {
  const billingPlans: BillingPlans = billingPlansData;
  return billingPlans[id];
}
