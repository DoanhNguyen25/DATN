import { Comment } from "./comment.types";

interface Category {
  _id: String;
  category_name: String;
}

export interface IProduct {
  _id: String;
  title: String;
  desc: String;
  listImg: String[];
  categories: Category;
  color: String;
  price: Number;
  reviews: Comment[];
  quantityInStock: Number;
}
