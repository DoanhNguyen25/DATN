import React from "react";
import { CategoriesWrapper } from "./style";
import { categories } from "../../data/data";
import CategoryItem from "../CategoryItem";

const Categories = () => {
  return (
    <CategoriesWrapper>
      {categories.map((category) => (
        <CategoryItem item={category} key={category.id} />
      ))}
    </CategoriesWrapper>
  );
};

export default Categories;
