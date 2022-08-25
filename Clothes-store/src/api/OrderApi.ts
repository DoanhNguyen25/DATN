import axios from "../constants/instance";

interface OrderBody {
  fullname: string;
  email: string;
  phone: string;
  address: string;
}
function CreateOrder(urlFetch: string, data: OrderBody) {
  return axios.post(urlFetch, {
    ...data,
    status: 0,
  });
}

function GetOrder(urlFetch: string){
  return axios.get(urlFetch)
}


export {CreateOrder, GetOrder}