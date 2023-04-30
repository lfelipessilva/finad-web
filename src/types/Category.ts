export interface ICategory {
  id: string;
  name: string;
  icon: string;
  type: string;
  created_at: Date;
  updated_at: Date;
};

export interface ICreateCategory {
  name: string;
  type: string;
}