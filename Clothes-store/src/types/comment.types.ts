import {
  ADD_CART_FAIL,
  ADD_COMMENT_FAIL,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
} from "../redux/actionTypes/ActionTypes";

export interface Comment {
  _id: String;
  owner: String;
  product: String;
  comment: String;
  name: String;
}

export interface CommentState {
  loading: boolean;
  comments: Comment[] | [];
  message: String;
}

interface AddCommentRequest {
  type: typeof ADD_COMMENT_REQUEST;
}

interface AddCommentSuccess {
  type: typeof ADD_COMMENT_SUCCESS;
  payload: String;
}
interface AddCommentFail {
  type: typeof ADD_COMMENT_FAIL;
  payload: String;
}

export type CommentAction =
  | AddCommentSuccess
  | AddCommentRequest
  | AddCommentFail;
