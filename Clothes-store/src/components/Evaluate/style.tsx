import styled from "styled-components";

export const EvaluateWrapper = styled.div`
  width: 50rem;
  /* height: 3rem; */
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 2rem 0.5rem;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  .evaluate__info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &--avatar {
      display: flex;
      div {
        width: 2rem;
        height: 2rem;
        border-radius: 10px;
        background: gray;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 0.5rem;
      }
    }
  }

  .evaluate__content {
    margin-top: 0.5rem;
    width: 100%;
    border-radius: 10px;
    background: #e3e6e8;
    padding: 0.5rem 0rem;
    font-family: 'Roboto Mono', monospace;
    /* margin-left: 5%; */
    &--container {
      width: 95%;
      margin: 0 auto;
    }
    span {
      margin-left: 1rem;
    }
  }
`;
