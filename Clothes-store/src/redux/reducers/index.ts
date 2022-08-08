import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { commentReducer } from "./commentReducer";

import { userRegisterReducer } from "./registerReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  userReducer: userReducer,
  userRegisterReducer: userRegisterReducer,
  cartReducer: cartReducer,
  commentReducer: commentReducer,
});

export default rootReducer;
export type State = ReturnType<typeof rootReducer>;
