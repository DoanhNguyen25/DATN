import styled from "styled-components";

export const SaleWrapper = styled.div`
  width: 100%;
  height: 30rem;
  position: relative;

  .sale__container {
    width: 30%;
    /* background-color: green; */
    z-index: 9;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    .sale--title {
      font-size: 3rem;
      font-weight: 600;
      color: #fff;
      margin-bottom: 1rem;
    }
    .sale--desc {
      color: white;
      letter-spacing: 0.2rem;
      margin-bottom: 1rem;
    }
    .sale--btn {
      button {
        border: none;
        outline: none;
        padding: 0.75rem 1.5rem;
        color: #fff;
        background-color: teal;
      }
    }
  }
  .sale__overlay {
    width: 100%;
    height: 100%;
    top: 0;
    position: absolute;
    background-image: url("https://i.imgur.com/gk6shiO.jpeg");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    filter: brightness(40%);
  }
`;
