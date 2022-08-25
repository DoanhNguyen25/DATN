import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { GetOrder } from "../../api/OrderApi";
import { ProductInCart } from "../../types/cart.types";
import { UserInfo } from "../../types/user.types";

function createData(
  fullname: string,
  address: string,
  phone: string,
  status: number,
  email: string,
  products: ProductInCart[],
  bill: number
) {
  return { fullname, address, phone, status, email, products, bill };
}

const render = (data: any) => {
  switch (data) {
    case 0:
      return "Đang chuẩn bị hàng";
    case 1:
      return "Đang giao hàng";
    case 2:
      return "Đã thanh toán";
    default:
      return "Đang chuẩn bị hàng";
  }
};

const OrderHistory = () => {
  const [orders, setOrders] = useState<any>();
  const userInfoFromStorage: UserInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") + "")
    : undefined;

  const getOrder = async () => {
    try {
      const req = await GetOrder("http://localhost:8000/api/order");
      if (req.data) {
        setOrders(req.data);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  const rows =
    orders &&
    orders
      .filter((item: any) => item.userId === userInfoFromStorage._id)
      .map((order: any) =>
        createData(
          order.fullname,
          order.address,
          order.phone,
          order.status,
          order.email,
          order.products,
          order.bill
        )
      );

  return (
    <MainLayout>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" width={"15%"}>
                Tên Người Đặt
              </TableCell>
              <TableCell align="center">Địa Chỉ</TableCell>
              <TableCell align="center">Điện Thoại</TableCell>
              <TableCell align="center">Trạng Thái</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Sản Phẩm</TableCell>
              <TableCell align="center">Tổng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.map((row: any) => (
                <TableRow
                  key={row.fullname}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th">{row.fullname}</TableCell>
                  <TableCell align="center">{row.address}</TableCell>
                  <TableCell align="center">{row.phone}</TableCell>
                  <TableCell align="center">{render(row.status)}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">
                    {row.products &&
                      row.products
                        .map(
                          (product: any) =>
                            `${product.productName}: ${product.quantity}`
                        )
                        .join()}
                  </TableCell>
                  <TableCell align="center">{row.bill}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainLayout>
  );
};

export default OrderHistory;
