import React from "react";

import { CommentWrapper } from "./style";

const Comment = () => {
  return (
    <CommentWrapper>
      <div className="comment__form">
        <textarea placeholder="bình luận....."></textarea>
        <button>bình luận</button>
      </div>
      <div className="comment__display">123 abc xyz</div>
    </CommentWrapper>
  );
};

export default Comment;
