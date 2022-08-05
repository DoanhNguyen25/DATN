import { combineReducers } from "redux";
import { userRegisterReducer } from "./registerReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  userReducer: userReducer,
  userRegisterReducer: userRegisterReducer,
});

export default rootReducer;
export type State = ReturnType<typeof rootReducer>;
