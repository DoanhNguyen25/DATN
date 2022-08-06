import axios from "../constants/instance";

function GetPoduct(urlFetch: string) {
  return axios.get(urlFetch);
}

export { GetPoduct };
