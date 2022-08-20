import styled from "styled-components";

export const CategoriesWrapper = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  flex-direction: column;

  .category--title {
    text-align: center;
    font-size: 3rem;
    position: absolute;
    background-color: #fff;
    left: 43.75%;
    transform: translateY(-40px);
    padding: 0 0.5rem;
    color: teal;
  }
`;
