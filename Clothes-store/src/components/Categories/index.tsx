import React from "react";
import { CategoriesWrapper } from "./style";
import { categories } from "../../data/data";
import CategoryItem from "../CategoryItem";

const Categories = () => {
  return (
    <CategoriesWrapper>
      <div style={{ position: "relative", margin: "4rem 0" }}>
        <div className="category--title">Danh Mục</div>
        <div
          style={{
            width: "20%",
            height: "0.1rem",
            background: "teal",
            margin: "0 auto",
          }}
        ></div>
      </div>

      <div style={{ display: "flex", padding: "20px" }}>
        {categories.map((category) => (
          <CategoryItem item={category} key={category.id} />
        ))}
      </div>
    </CategoriesWrapper>
  );
};

export default Categories;
