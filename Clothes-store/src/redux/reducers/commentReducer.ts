import { CommentAction, CommentState } from "../../types/comment.types";
import {
  ADD_COMMENT_FAIL,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
} from "../actionTypes/ActionTypes";

const initialState: CommentState = {
  loading: false,
  comments: [],
  message: "",
};

export const commentReducer = (
  state: CommentState = initialState,
  action: CommentAction
) => {
  switch (action.type) {
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: [...state.comments, action.payload],
      };
    case ADD_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    default:
      return state;
  }
};
