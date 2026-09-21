export type Role = "company" | "provider";
export type JobStatus = "open" | "in_progress" | "completed" | "cancelled";
export type BidStatus = "pending" | "accepted" | "rejected";

export interface Profile {
  id: string;
  role: Role;
  display_name: string;
  company_name: string | null;
  bio: string | null;
  created_at: string;
}

export interface Job {
  id: string;
  company_id: string;
  title: string;
  description: string;
  category: string;
  budget_min: number | null;
  budget_max: number | null;
  status: JobStatus;
  created_at: string;
  company?: Pick<Profile, "display_name" | "company_name">;
}

export interface Bid {
  id: string;
  job_id: string;
  provider_id: string;
  amount: number;
  message: string | null;
  status: BidStatus;
  created_at: string;
  provider?: Pick<Profile, "display_name">;
}

export const CATEGORIES = [
  "Website build or refresh",
  "IT help desk / support",
  "Networking",
  "Databases",
  "Custom application development",
  "Other",
];
