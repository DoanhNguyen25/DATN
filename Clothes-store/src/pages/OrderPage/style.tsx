import styled from "styled-components";

export const OrderPageWrapper = styled.div`
  .order__container {
    width: 50%;
    margin: 0 auto;
    /* background: red; */
    /* height: 20rem; */
    display: flex;

    .order__form {
      flex: 2;
      /* background: green; */
      .msg__error {
        color: red;
      }
      .form__group {
        display: flex;
        width: 50%;
        margin-bottom: 2rem;
        &:last-child {
          margin-bottom: 0rem;
        }
        &--label {
          flex: 1;
        }
        &--input {
          flex: 2;

          input {
            width: 100%;
            padding: 0.5rem 0.5rem;
            outline: none;
          }
        }
      }
    }

    .order__info {
      flex: 1;
      border: 1px solid gray;
      /* background: yellow; */
    }
  }
`;
