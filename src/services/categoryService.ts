import { ICategory, ICreateCategory } from "../types/Category";
import { apiClient } from ".";

const createCategory = async (category: ICreateCategory) => {
  const response = await apiClient.post<any>("/category", category);
  return response;
}

const findAll = async () => {
  try {
    const response = await apiClient.get<ICategory[]>("/category");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

const findById = async (id: string) => {
  const response = await apiClient.get<ICategory>(`/category/${id}`);
  return response;
}

const update = async (id: string, { name }: ICategory) => {
  const response = await apiClient.put<any>(`/category/${id}`, { name });
  return response;
}

const deleteById = async (id: string) => {
  const response = await apiClient.delete<any>(`/category/${id}`);
  return response;
}

const deleteAll = async () => {
  const response = await apiClient.delete<any>("/category");
  return response;
}

const CategoryService = {
  createCategory,
  findAll,
  findById,
  update,
  deleteById,
  deleteAll
}

export default CategoryService;