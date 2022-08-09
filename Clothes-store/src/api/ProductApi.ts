import axios from "../constants/instance";

function GetPoduct(urlFetch: string) {
  return axios.get(urlFetch);
}

function GetComment(urlFetch: string) {
  return axios.get(urlFetch);
}

function CommentProduct(urlFetch: string, comment: string) {
  return axios.post(urlFetch, {
    comment,
  });
}

function GetProductBySearch(urlFetch: string) {
  return axios.get(urlFetch);
}

function GetProductByCategory(urlFetch: string) {
  return axios.get(urlFetch);
}

export {
  GetPoduct,
  CommentProduct,
  GetProductBySearch,
  GetProductByCategory,
  GetComment,
};
