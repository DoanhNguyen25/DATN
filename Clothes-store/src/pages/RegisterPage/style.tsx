import styled from "styled-components";

export const SignUpContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
`;

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;

  .form__group {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;
    &:last-child {
      margin-bottom: 0rem;
    }

    &--input {
      display: flex;
      flex-direction: column;

      .error-field {
        border: 1px solid red;
      }

      .msg__error {
        color: red;
      }

      input {
        font-size: 1rem;
        outline: none;
      }
    }
  }
`;

export const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 10px 10px 0px;
  padding: 10px;
`;

export const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

export const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
