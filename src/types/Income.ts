export type Income = {
  id: string;
  userId: string;
  value: number;
  date: Date;
  description: string;
  created_at: Date;
  updated_at: Date;
};

export interface ICreateIncome {
  value: number;
  status: "received" | "unreceived";
  description: string;
  date: Date;
  categoryId: string;
  accountId: string;
}
