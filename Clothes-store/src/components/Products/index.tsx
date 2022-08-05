import React from "react";
import { popularProducts } from "../../data/data";
import Product from "../Product";
import { ProductsWrapper } from "./style";

const Products = () => {
  return (
    <ProductsWrapper>
      {popularProducts.map((product) => (
        <Product item={product} key={product.id} />
      ))}
    </ProductsWrapper>
  );
};

export default Products;
