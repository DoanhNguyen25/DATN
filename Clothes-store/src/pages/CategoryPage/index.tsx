/* eslint-disable react/jsx-no-undef */
import React from "react";
import Annoucement from "../../components/Annoucement";
import Newsletter from "../../components/Newsletter";
import Products from "../../components/Products";
import MainLayout from "../../layouts/MainLayout";
import {
  Filter,
  FilterContainer,
  FilterText,
  Select,
  Title,
  Option,
} from "./style";

const CategoryPage = () => {
  return (
    <>
      <MainLayout>
        <Title>Dress</Title>
        <FilterContainer>
          <Filter>
            <FilterText>Filter Products:</FilterText>
            <Select>
              <Option>Color</Option>
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
            <Select>
              <Option selected>Newest</Option>
              <Option>Price (asc)</Option>
              <Option>Price (desc)</Option>
            </Select>
          </Filter>
        </FilterContainer>
        <Products />
        <Newsletter />
      </MainLayout>
    </>
  );
};

export default CategoryPage;
