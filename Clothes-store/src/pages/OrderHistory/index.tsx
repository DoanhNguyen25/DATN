import React from "react";
import MainLayout from "../../layouts/MainLayout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  name: string,
  address: string,
  phone: string,
  status: number,
  email: string,
  product: string,
  total: number
) {
  return { name, address, phone, status, email, product, total };
}

const rows = [
  createData(
    "DoanhNguyen",
    "132 cầu giấy",
    "0919391071",
    0 ,
    "doanhnguyen@gmail.com",
    "áo:2 cái",
    200000
  ),
];

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
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.address}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{render(row.status)}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.product}</TableCell>
                <TableCell align="center">{row.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainLayout>
  );
};

export default OrderHistory;
