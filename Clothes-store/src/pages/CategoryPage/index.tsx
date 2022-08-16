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
  const [size, setSize] = useState<string>("");
  const [sort, setSort] = useState<string>("newest");
  const { id } = useParams();

  if (sort.split(" ")[1] === "desc") {
    setSort(`-${sort.split(" ")[0]}`);
  }
  if (sort == "newest") {
    setSort("createdAt");
  }
  useEffect(() => {
    const getProduct = async () => {
      try {
        const req = await GetProductByCategory(
          `http://localhost:8000/api/product2/${id}?sort=${sort}&color=${color}`
        );

        if (req.data) {
          setProducts(req.data.products);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    };
    getProduct();
  }, [id, sort, color]);
  return (
    <MainLayout>
      <CategoryPageWrapper>
        <Title>Dress</Title>
        <FilterContainer>
          <Filter>
            <FilterText>Filter Products:</FilterText>
            <Select onChange={(e) => setColor(e.target.value.toLowerCase())}>
              <Option disabled selected>
                Color
              </Option>
              <Option>White</Option>
              <Option>Black</Option>
              <Option>Red</Option>
              <Option>Blue</Option>
              <Option>Yellow</Option>
              <Option>Green</Option>
            </Select>
            <Select>
              <Option disabled selected>
                Size
              </Option>
              <Option>XS</Option>
              <Option>S</Option>
              <Option>M</Option>
              <Option>L</Option>
              <Option>XL</Option>
            </Select>
          </Filter>
          <Filter>
            <FilterText>Sort Products:</FilterText>
            <Select onChange={(e) => setSort(e.target.value.toLowerCase())}>
              <Option selected>Newest</Option>
              <Option>Price asc</Option>
              <Option>Price desc</Option>
            </Select>
          </Filter>
        </FilterContainer>
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
              <div style={{ fontSize: "2rem" }}>Không tồn tại sản phẩm !! </div>
            </div>
          )}
        </div>
        <Newsletter />
      </CategoryPageWrapper>
    </MainLayout>
  );
};

export default CategoryPage;
