import axios from "../constants/instance";
import { UserInfo } from "../types/user.types";

function SendMail(urlFetch: string, email: string) {
  return axios.post(urlFetch, { email });
}
function UploadFile(urlFetch: string) {
  return axios.post(urlFetch);
}
function GetUserInfo(urlFetch: string) {
  return axios.get(urlFetch);
}
function EditUser(urlFetch: string, data: UserInfo) {
  return axios.patch(urlFetch, { ...data, isAdmin: false });
}


export { SendMail, UploadFile, GetUserInfo, EditUser };
