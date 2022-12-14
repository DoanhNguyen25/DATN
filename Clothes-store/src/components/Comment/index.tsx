import React, { Dispatch, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { commentProduct, getComment } from "../../redux/action/productAction";
import { State } from "../../redux/reducers";
import Evaluate from "../Evaluate";
import { CommentWrapper } from "./style";

const Comment = ({ comment }: any) => {
  const [value, setValue] = useState<string>("");
  const dispatch: Dispatch<any> = useDispatch();
  const { id } = useParams();
  const productId = id;
  const a: any = useSelector((state: State) => state.commentReducer);
  // console.log("hello", a);
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
        <button
          onClick={handleComment}
          style={{
            border: "none",
            outline: "none",
            padding: "1rem 2rem",
            background: "teal",
            color: "#fff",
          }}
        >
          Bình luận
        </button>

        <div style={{ marginTop: "1rem" }}>
          {
            a.comments.filter((comment: any) => comment.product === productId)
              ?.length
          }{" "}
          Bình Luận
        </div>
      </div>
      {a.comments &&
        a.comments
          .filter((comment: any) => comment.product === productId)
          .map((review: any) => (
            <div key={review._id}>
              <Evaluate value={review} />
            </div>
          ))}
    </CommentWrapper>
  );
};

export default Comment;
