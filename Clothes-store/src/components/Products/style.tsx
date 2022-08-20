import styled from "styled-components";

export const ProductsWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  min-height: 20rem;
  flex-direction: column;

  .products--title {
    text-align: center;
    font-size: 3rem;
    position: absolute;
    background-color: #fff;
    left: 39.75%;
    transform: translateY(-40px);
    padding: 0 0.5rem;
    color: teal;
  }
`;
