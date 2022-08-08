import { Dispatch } from "react";
import { toast } from "react-toastify";
import { CommentProduct } from "../../api/ProductApi";
import { CommentAction } from "../../types/comment.types";
import {
  ADD_COMMENT_FAIL,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
} from "../actionTypes/ActionTypes";

export const commentProduct =
  (comment: string, productId: any) =>
  async (dispatch: Dispatch<CommentAction>) => {
    try {
      dispatch({
        type: ADD_COMMENT_REQUEST,
      });
      const req = await CommentProduct(
        `http://localhost:8000/api/comment/${productId}`,
        comment
      );
      if (req.data) {
        dispatch({
          type: ADD_COMMENT_SUCCESS,
          payload: req.data.message,
        });
      }

      toast.success("comment thành công");
    } catch (error: any) {
      dispatch({
        type: ADD_COMMENT_FAIL,
        payload: error.message,
      });
      toast.error("comment thất bại");
    }
  };
