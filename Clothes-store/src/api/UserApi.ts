import axios from "../constants/instance";

function SendMail(urlFetch: string, email: string) {
  return axios.post(urlFetch, { email });
}
function UploadFile(urlFetch: string) {
  return axios.post(urlFetch);
}

export { SendMail, UploadFile };
