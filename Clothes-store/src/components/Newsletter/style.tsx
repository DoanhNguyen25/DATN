import styled from "styled-components";

export const NewsletterWrapper = styled.div`
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 5rem;
  p {
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 20px;
  }

  .input__container {
    width: 30%;
    height: 40px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgray;

    input[type="text"] {
      border: none;
      flex: 8;
      padding-left: 20px;
      outline: none;
    }
  }
`;
