import styled from "styled-components";

export const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.539);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;

  .info__container {
    display: flex;
    flex-direction: column;
    color: #fff;
    min-width: 20rem;

    .info--link {
      a {
        color: teal;
        text-decoration: none;
        &:hover,
        :active {
          text-decoration: underline;
        }
      }
    }
    .info--title {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    .info--detail {
      margin-top: 0.5rem;
      display: flex;
      justify-content: space-between;
    }
  }
`;

export const ProductWrapper = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 400px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }

  img {
    height: 75%;
    z-index: 2;
  }
`;

export const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

export const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
