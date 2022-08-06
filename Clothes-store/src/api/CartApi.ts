import axios from "../constants/instance";
interface ItemAddToCart {
  productId: String;
  quantity: number;
  color: String;
  size: String;
}
interface UpdateBody {
  type: string;
  productId: string;
}

function AddToCart(urlFetch: string, item: ItemAddToCart) {
  return axios.post(urlFetch, item);
}

function GetCart(urlFetch: string) {
  return axios.get(urlFetch);
}

function UpdateCart(urlFetch: string, body: UpdateBody) {
  return axios.patch(urlFetch, body);
}
function DeleteItem(urlFetch: string) {
  return axios.delete(urlFetch);
}
export { AddToCart, GetCart, UpdateCart, DeleteItem };
