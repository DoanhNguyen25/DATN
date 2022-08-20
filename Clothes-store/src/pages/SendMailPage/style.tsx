import styled from "styled-components";

export const SendMailWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;

  .sendmail__container {
    width: 25%;
    padding: 20px;
    background-color: white;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  .form__group--input {
    display: flex;
    flex-direction: column;

    .msg__error {
      color: red;
    }
  }
`;

export const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

export const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  margin-bottom: 1rem;
`;

export const LinkCustom = styled.a`
  margin: 5px 0px;
  font-size: 1rem;
  text-decoration: underline;
  cursor: pointer;
`;
