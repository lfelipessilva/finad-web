export type Account = {
  id: string;
  userId: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
};

export interface ICreateAccount {
  name: string;
  description: string;
}
