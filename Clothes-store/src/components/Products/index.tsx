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
        const res = await GetPoduct(
          "http://localhost:8000/api/products?size=3"
        );
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
      <div style={{ position: "relative", margin: "4rem 0" }}>
        <div className="products--title">Sản phẩm nổi bật</div>
        <div
          style={{
            width: "30%",
            height: "0.1rem",
            background: "teal",
            margin: "0 auto",
          }}
        ></div>
      </div>
      <div style={{ display: "flex", padding: "20px" }}>
        {products &&
          products.map((product) => (
            <Product item={product} key={product._id} />
          ))}
      </div>
    </ProductsWrapper>
  );
};

export default Products;
