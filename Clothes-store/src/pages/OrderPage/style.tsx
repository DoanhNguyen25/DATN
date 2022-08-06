import styled from "styled-components";

export const OrderPageWrapper = styled.div`
<<<<<<< HEAD
=======
.order__main{
>>>>>>> 018741a (feat:admin)
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
<<<<<<< HEAD
          margin-top: 0.4rem;
=======
          margin-top: .4rem;
>>>>>>> 018741a (feat:admin)
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
<<<<<<< HEAD

      &--products {
        width: 100%;
         
        max-height: 28rem;
        overflow: auto;
        padding-right: 0.5rem;

        &::-webkit-scrollbar-track {
          /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
          border-radius: 10px;
          background-color: #f5f5f5;
        }
        &::-webkit-scrollbar {
          width: 12px;
          border-radius: 10px;
          background-color: #f5f5f5;
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
          background-color: teal;
        }
      }

      &--payment {
        width: 100%;
        margin-top: 1rem;
        /* height: 3rem; */
        background: #09b0b026;
        /* padding: 0.5rem 1rem; */

        .btn-order {
          margin: 1rem 0 2rem;
          button {
            width: 100%;
            padding: 1rem 0.5rem;
            text-align: center;
            background-color: teal;
            border-radius: 3px;
            border: none;
            cursor: pointer;
            color: #fff;
            &:active {
              opacity: 0.8;
            }
          }
        }

        .pricing {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            flex: 1;
          }
        }
      }
      .order__info--total {
        margin: 3rem 0;
        .order--price {
=======
      .order__info--product{
        width: 100%;
      }
      .order__info--total{
        margin: 3rem 0;
        .order--price{
>>>>>>> 018741a (feat:admin)
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #999;
          padding-top: 1rem;
<<<<<<< HEAD
          &:nth-child(2) {
            padding-bottom: 1rem;
            border-bottom: 1px solid #ccc;
          }
          &:last-child {
            padding-top: 1.5rem;
            span {
              &:last-child {
=======
          &:nth-child(2){
            padding-bottom: 1rem;
            border-bottom: 1px solid #ccc;
          }
          &:last-child{
            padding-top: 1.5rem;
            span{
              &:last-child{
>>>>>>> 018741a (feat:admin)
                color: #000;
                font-weight: 500;
              }
            }
          }
        }
      }
    }
  }
<<<<<<< HEAD
=======
}
>>>>>>> 018741a (feat:admin)
`;

export const CartItemWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ccc;
<<<<<<< HEAD
  & ~ & {
    margin-top: 1rem;
  }
  .order--product__image {
    width: 5rem;
    height: 5rem;
    border-radius: 0.3rem;
    margin-right: 2rem;
    img {
      width: 100%;
      height: 100%;
      border-radius: 0.3rem;
    }
  }
  .order--product__content {
=======
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
>>>>>>> 018741a (feat:admin)
    width: calc(100% - 7rem);
    display: flex;
    justify-content: space-between;
    align-items: center;
<<<<<<< HEAD
    .product__content--left {
      width: 100%;
      padding-right: 1rem;
      .product__name {
        font-size: 1.125rem;
      }
      .product__color {
=======
    .product__content--left{
      width: 100%;
      padding-right: 1rem;
      .product__name{
        font-size: 1.125rem;
      }
      .product__color{
>>>>>>> 018741a (feat:admin)
        color: #ccc;
        font-size: 1rem;
      }
    }
<<<<<<< HEAD
    .product__content--right {
      span {
=======
    .product__content--right{
      span{
>>>>>>> 018741a (feat:admin)
        font-size: 1rem;
      }
    }
  }
`;
