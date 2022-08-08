import styled from "styled-components";

export const CommentWrapper = styled.div`
  width: 50%;
  padding: 3.125rem;
  display: flex;
  flex-direction: column;
  .comment__form {
    &--input {
      max-width: 50rem;
      width: 50rem;
      padding: 0.5rem;
      font-size: 1rem;
      font-family: "Roboto Mono", monospace;
    }
  }
`;
