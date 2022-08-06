import React, { useEffect, useState } from "react";
import { popularProducts } from "../../data/data";
import Product from "../Product";
import { ProductsWrapper } from "./style";
import { IProduct } from "../../types/product.types";
import { GetPoduct } from "../../api/ProductApi";
const Products = () => {
  const [products, setProducts] = useState<IProduct[]>();
  useEffect(() => {
    try {
      const getListProduct = async () => {
        const res = await GetPoduct("http://localhost:8000/api/products");
        if (res.data) {
          setProducts(res.data.products);
        }
      };

      getListProduct();
    } catch (error: any) {
      console.log(error.message);
    }
  }, []);
  return (
    <ProductsWrapper>
      {products &&
        products.map((product) => <Product item={product} key={product._id} />)}
    </ProductsWrapper>
  );
};

export default Products;
