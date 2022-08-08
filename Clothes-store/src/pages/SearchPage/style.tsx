import styled from "styled-components";

export const SearchPageWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  padding-top: 2rem;

  .list__product {
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &--loading {
      width: 100%;
      display: flex;
      justify-content: center;
      min-height: calc(100vh - 1.875rem - 30rem);
      .css-18lrjg1-MuiCircularProgress-root {
        color: teal;
      }
    }
  }
  .search__result--text {
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 2rem;
    margin-left: 1rem;
    font-family: "Roboto Mono", monospace;
  }
`;
