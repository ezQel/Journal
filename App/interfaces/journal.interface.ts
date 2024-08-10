import { Category } from "./category";

export interface Journal {
  id: number | null;
  createdAt: Date;
  updatedAt: Date;
  date: string;
  title: string;
  content: string;
  category: Category;
  categoryId: number | null;
}
