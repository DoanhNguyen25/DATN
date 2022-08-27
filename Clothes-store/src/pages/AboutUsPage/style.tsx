import styled from "styled-components";

export const AboutWrapper = styled.div`
  .about__introduce {
    width: 100%;
    text-align: center;
    margin-top: 5rem;
    margin-bottom: 6rem;
    &--title {
      font-size: 2.5rem;
      font-weight: 600;
      color: teal;
      margin-bottom: 1rem;
    }

    &--text {
      padding: 0 300px;
      text-align: justify;
      letter-spacing: 1px;
      line-height: 1.5;
      font-style: italic;
      font-size: 1.25rem;
    }
  }

  .about__part1 {
    width: 100%;
    /* height: 30rem; */
    display: flex;

    &--quotes {
      flex: 1;
      background-color: teal;
      position: relative;
      color: #fff;
      font-size: 1.25rem;
      .quotes__container {
        width: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    &--image {
      flex: 1;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .about__enumeration {
    width: 80%;
    margin: 6rem auto;

    &--title {
      font-size: 2.5rem;
      font-weight: 600;
      color: teal;
      text-align: center;
      margin-bottom: 1rem;
    }

    &--item {
      width: calc((100%) / 3 - 1rem);
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &--list {
      display: flex;
      justify-content: space-between;
    }
  }
`;
