import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GetProductBySearch } from "../../api/ProductApi";
import Product from "../../components/Product";
import MainLayout from "../../layouts/MainLayout";
import { IProduct } from "../../types/product.types";
import { SearchPageWrapper } from "./style";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const keySearch = searchParams.get("keySearch");
  const [isLoading, setIsLoading] = useState(true);
  const [mealSearch, setMealSearch] = useState<IProduct[]>([]);

  useEffect(() => {
    const getProduct = async () => {
      const req = await GetProductBySearch(
        `http://localhost:8000/api/products?keySearch=${keySearch}`
      );
      if (req.data) {
        setIsLoading(false);
        setMealSearch(req.data.products);
      }
    };
    getProduct();
  }, [keySearch]);

  return (
    <MainLayout>
      <SearchPageWrapper>
        <div className="search__result--text">
          {`${mealSearch && mealSearch.length}`} kết quả tìm kiếm{" "}
          {`"${keySearch}"`}
        </div>
        <div className="list__product">
          {isLoading ? (
            <div className="list__product--loading">
              <CircularProgress />
            </div>
          ) : mealSearch?.length > 0 ? (
            mealSearch.map((meal) => <Product item={meal} key={meal._id} />)
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
              <div style={{ fontSize: "2rem" }}>
                Không tìm thấy món ăn cho từ khóa{" "}
                <span style={{ color: "teal" }}>{`"${keySearch}"`}</span>
              </div>
            </div>
          )}
        </div>
      </SearchPageWrapper>
    </MainLayout>
  );
};

export default SearchPage;
