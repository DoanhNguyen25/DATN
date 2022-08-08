import React, { Dispatch, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { commentProduct } from "../../redux/action/productAction";
import Evaluate from "../Evaluate";
import { CommentWrapper } from "./style";

const Comment = ({ comment }: any) => {
  const [value, setValue] = useState<string>("");
  const dispatch: Dispatch<any> = useDispatch();
  const { id } = useParams();
  const productId = id;
  const handleComment = () => {
    dispatch(commentProduct(value, productId));
  };
  return (
    <CommentWrapper>
      <div className="comment__form">
        <textarea
          placeholder="bình luận....."
          className="comment__form--input"
          value={value}
          onChange={(e: any) => setValue(e.target.value)}
        ></textarea>
        <br />
        <button onClick={handleComment}>Bình luận</button>

        <div>{comment?.length} Bình Luận</div>
      </div>
      {comment &&
        comment.map((review: any) => (
          <div key={review._id}>
            <Evaluate value={review} />
          </div>
        ))}
    </CommentWrapper>
  );
};

export default Comment;
