import axios from "../constants/instance";

interface UserBody {
  username: String;
  password: String;
}
interface UserRegisterBody extends UserBody {
  fullname: String;
  phone: String;
  email: String;
}
function LoginData(urlFetch: string, user: UserBody) {
  return axios.post(urlFetch, user);
}

function RegisterData(urlFetch: string, user: UserRegisterBody) {
  return axios.post(urlFetch, user);
}
export  { LoginData, RegisterData };
