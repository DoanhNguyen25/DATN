import styled from "styled-components";

export const UserProfileWrapper = styled.div`
  width: 100%;
  background: #f5f5f5;
  padding-top: 2rem;
  padding-bottom:2rem;
  font-family: "Roboto Mono", monospace;

  .profile__container {
    width: 50%;
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
      padding-top:2.5rem;

      .detail__form {
        flex: 3;
        position: relative;

        &:after {
          content: "";
          flex: 3;
          height: 10rem;
          position: absolute;
          right: 0;
          top: 0;
          border-right: 1px solid #cececef5;
        }

        .form__group{
          display:flex;
          padding:0 2rem;
          margin-bottom: 2rem;

          label{
            flex:1;
          }
          input{
            flex:2;
            padding:0.5rem 1rem;
          }
        }

        button{
          padding:0.75rem 1.5rem;
          border:none;
          outline:none;
          background-color: teal;
          color:#fff;
          transform:translateX(11.75rem)
        }
      }
      .detail__avatar {
        flex: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: "Roboto Mono", monospace;
        text-align: center;
        &--image{
          width:6.25rem;
          height: 6.25rem;
          margin-bottom: 1rem;
          img{
            width:100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
          }
        }
        &--btn{
          button{
          padding:0.5rem 1rem;
          border:2px solid teal;
          outline:none;
          background-color:transparent;
          color: gray;
          }
        }
      }
    }
  }
`;
