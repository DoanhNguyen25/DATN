import styled from "styled-components";

export const ContactWrapper = styled.div`
  .contact__container {
    width: 65%;
    /* height: 4rem; */
    margin: 3rem auto;
    /* background-color: red; */
    display: flex;

    .contact__info {
      flex: 1;
      /* background-color: green; */

      &--title {
        font-size: 2rem;
        font-weight: 600;
        color: teal;
      }
    }

    .contact__form {
      flex: 1;
      padding-top: 1rem;
      /* background-color: pink; */
      button {
        outline: none;
        border: none;
        padding: 1rem 2rem;
        background-color: teal;
        color: #fff;
        margin-top: 1.5rem;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;
