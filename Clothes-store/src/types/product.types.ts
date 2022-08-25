import { Comment } from "./comment.types";

interface Category {
  _id: String;
  category_name: String;
}

export interface IProduct {
  _id: String;
  title: String;
  desc: string;
  listImg: string[];
  categories: Category;
  color: String;
  price: number;
  reviews: Comment[];
  quantityInStock: Number;
}
