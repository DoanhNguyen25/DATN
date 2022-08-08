import axios from "../constants/instance";

function SendMail(urlFetch: string, email: string) {
  return axios.post(urlFetch, { email });
}

export { SendMail };
