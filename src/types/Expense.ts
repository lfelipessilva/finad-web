export type Expense = {
  id: string;
  userId: string;
  value: number;
  date: Date;
  description: string;
  created_at: Date;
  updated_at: Date;
};

export interface ICreateExpense {
  value: number;
  paid: boolean;
  description: string;
  date: Date;
}