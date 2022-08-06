import styled from "styled-components";

export const OrderPageWrapper = styled.div`
.order__main{
  box-sizing: border-box;
  width: 100%;
  overflow-x: hidden;
  padding-bottom: 4rem;
  .order__container {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 5rem;
    margin-top: 2rem;
    .order__form {
      flex: 2;
      width: 100%;
      padding-right: 5rem;
      .msg__error {
        color: red;
      }
      .form__group {
        width: 100%;
        margin-bottom: 2rem;
        &:last-child {
          margin-bottom: 0rem;
        }
        &--label {
          margin-right: 2rem;
        }
        &--input {
          margin-top: .4rem;
          width: 100%;
          input {
            width: 100%;
            padding: 0.7rem 0.5rem;
            border: 1px solid #ccc;
            border-radius: 0.3rem;
            outline: none;
          }
        }
      }
      .btn-order{
        margin: 3rem 0 2rem;
        button{
          width: 20rem;
          padding: 1rem 0.5rem;
          text-align: center;
          background-color: teal;
          border-radius: 3px;
          border: none;
          cursor: pointer;
          color: #fff;
          &:active{
            opacity: 0.8;
          } 
        }
      }
    }

    .order__info {
      flex: 1;
      .order__info--product{
        width: 100%;
      }
      .order__info--total{
        margin: 3rem 0;
        .order--price{
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #999;
          padding-top: 1rem;
          &:nth-child(2){
            padding-bottom: 1rem;
            border-bottom: 1px solid #ccc;
          }
          &:last-child{
            padding-top: 1.5rem;
            span{
              &:last-child{
                color: #000;
                font-weight: 500;
              }
            }
          }
        }
      }
    }
  }
}
`;

export const CartItemWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ccc;
  & ~ &{
        margin-top: 1rem;
      }
  .order--product__image{
    width: 5rem;
    height: 5rem;
    border-radius: .3rem;
    margin-right: 2rem;
    img{
      width: 100%;
      height: 100%;
      border-radius: .3rem;
    }
  }
  .order--product__content{
    width: calc(100% - 7rem);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .product__content--left{
      width: 100%;
      padding-right: 1rem;
      .product__name{
        font-size: 1.125rem;
      }
      .product__color{
        color: #ccc;
        font-size: 1rem;
      }
    }
    .product__content--right{
      span{
        font-size: 1rem;
      }
    }
  }
`;
