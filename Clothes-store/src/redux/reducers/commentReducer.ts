import { CommentAction, CommentState } from "../../types/comment.types";
import {
  ADD_COMMENT_FAIL,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  GET_COMMENT,
} from "../actionTypes/ActionTypes";

const initialState: CommentState = {
  loading: false,
  comments: [],
  message: "",
};

// export const commentReducer = (
//   state: CommentState = initialState,
//   action: CommentAction
// ) => {
//   switch (action.type) {
//     case ADD_COMMENT_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };
//     case ADD_COMMENT_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         comments: [...state.comments, action.payload],
//       };
//     case ADD_COMMENT_FAIL:
//       return {
//         ...state,
//         loading: false,
//         message: action.payload,
//       };
//     case GET_COMMENT:
//       return {
//         ...state,
//         comment: action.payload,
//       };
//     default:
//       return state;
//   }
// };

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
      };
    case GET_COMMENT:
      return {
        ...state,
        comments: action.payload,
      };

    default:
      return state;
  }
};
