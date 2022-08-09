import styled from "styled-components";

export const UserProfileWrapper = styled.div`
  width: 100%;
  background: #f5f5f5;
  padding-top: 2rem;
  .profile__container {
    width: 50%;
    min-height: 50rem;
    background: #fff;
    margin: 0rem auto;
    padding: 1rem 3rem;

    .profile--title {
      width: 100%;
      height: 3rem;
      text-transform: capitalize;
      font-size: 1.5rem;
      border-bottom: 1px solid #cececef5;
    }

    .profile__detail {
      display: flex;
      justify-content: space-around;

      .detail__form {
        flex: 3;
        position: relative;
        &:after {
          content: "";
          flex: 3;
          height: 10rem;
          position: absolute;
          right: 0;
          border-right: 1px solid #cececef5;
        }
      }
      .detail__avatar {
        flex: 2;
      }
    }
  }
`;
