import styled from "styled-components";

export const CategoryPageWrapper = styled.div`
  .list__product {
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .load__more--btn {
    width: 10%;
    padding: 1rem;
    background: teal;
    text-transform: uppercase;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 2rem;
    color: #fff;
  }
`;
export const Title = styled.h1`
  margin: 20px;
`;
export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Filter = styled.div`
  margin: 20px;
`;

export const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

export const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
export const Option = styled.option``;
