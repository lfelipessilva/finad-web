export interface ITransaction {
  id: string;
  userId: string;
  status: string;
  type: string;
  description: string;
  category: {
    name: string;
  };
  value: number;
  date: Date;
  created_at: Date;
  updated_at: Date;
};

export interface ICreateTransaction {
  status: string;
  type: string;
  description: string;
  category: string;
  value: number;
  date: Date;
}