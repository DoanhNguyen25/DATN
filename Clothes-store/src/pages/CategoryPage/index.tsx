/* eslint-disable react/jsx-no-undef */
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetProductByCategory } from "../../api/ProductApi";
import Annoucement from "../../components/Annoucement";
import Newsletter from "../../components/Newsletter";
import Product from "../../components/Product";
import Products from "../../components/Products";
import MainLayout from "../../layouts/MainLayout";
import { IProduct } from "../../types/product.types";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import {
  Filter,
  FilterContainer,
  FilterText,
  Select,
  Title,
  Option,
  CategoryPageWrapper,
} from "./style";

const CategoryPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [color, setColor] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(3);
  const [sort, setSort] = useState<string>("newest");
  const { id } = useParams();

  if (sort?.split(" ")[1] === "desc") {
    setSort(`-${sort?.split(" ")[0]}`);
  }
  if (sort == "newest") {
    setSort("createdAt");
  }

  const getProduct = async () => {
    try {
      const req = await GetProductByCategory(
        `http://18.138.254.179:8000/api/product2/${id}?page=${page}&size=${size}&sort=${sort}&color=${color}`
      );

      if (req.data) {
        setProducts(req.data.products);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getProduct();
  }, [id, sort, color, size]);
  return (
    <MainLayout>
      <CategoryPageWrapper>
        <Title>Áo mùa đông</Title>
        <FilterContainer>
          <Filter>
            <FilterText>Lọc Sản phẩm:</FilterText>
            <Select onChange={(e) => setColor(e.target.value.toLowerCase())}>
              <Option disabled selected>
                Màu sắc
              </Option>
              <Option>White</Option>
              <Option>Black</Option>
              <Option>Red</Option>
              <Option>Blue</Option>
              <Option>Yellow</Option>
              <Option>Green</Option>
            </Select>
          </Filter>
          <Filter>
            <FilterText>Sắp xếp sản phẩm:</FilterText>
            <Select onChange={(e) => setSort(e.target.value.toLowerCase())}>
              <Option selected>Newest</Option>
              <Option>Price asc</Option>
              <Option>Price desc</Option>
            </Select>
          </Filter>
        </FilterContainer>
        <div>
          <div className="list__product">
            {isLoading ? (
              <div className="list__product--loading">
                <CircularProgress />
              </div>
            ) : products?.length > 0 ? (
              products.map((meal) => <Product item={meal} key={meal._id} />)
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "2rem 0rem",
                  minHeight: "20rem",
                  fontFamily: '"Roboto Mono", monospace',
                }}
              >
                <SentimentVeryDissatisfiedIcon
                  style={{ color: "teal", fontSize: "4.5rem" }}
                />
                <br />
                <div style={{ fontSize: "2rem" }}>
                  Không tồn tại sản phẩm !!{" "}
                </div>
              </div>
            )}
          </div>

          <div
            className="load__more--btn"
            onClick={() => setSize((pre) => pre + 3)}
          >
            Xem thêm
          </div>
        </div>

        <Newsletter />
      </CategoryPageWrapper>
    </MainLayout>
  );
};

export default CategoryPage;
