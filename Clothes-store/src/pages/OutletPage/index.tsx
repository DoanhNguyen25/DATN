import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { OutletWrapper } from "./style";

const OutletPage = () => {
  return (
    <MainLayout>
      <OutletWrapper>
        <div className="outlet__container">
          <br />
          <h1>Cửa hàng Hà Nội</h1>
          <div>
            <h1 style={{ textTransform: "uppercase", color: "teal" }}>
              hệ thống cửa hàng Lama tại việt nam:
            </h1>
            <div>
              <div>
                <span
                  style={{
                    width: "1rem",
                    height: "1rem",
                    display: "inline-block",
                    background: "black",
                    marginRight: "0.5rem",
                  }}
                ></span>
                <span style={{ fontWeight: "600", fontSize: "1.5rem" }}>
                  Lama Hà nội:
                </span>
                <p>- 132 cầu giấy, quan hoa , cầu giấy, Hà nội</p>
              </div>

              <div>
                <span
                  style={{
                    width: "1rem",
                    height: "1rem",
                    display: "inline-block",
                    background: "black",
                    marginRight: "0.5rem",
                  }}
                ></span>
                <span style={{ fontWeight: "600", fontSize: "1.5rem" }}>
                  Lama Phú Thọ:
                </span>
                <p>- 26 ngô gia tự , tân việt, tân dân, Việt trì</p>
              </div>

              <div>
                <span
                  style={{
                    width: "1rem",
                    height: "1rem",
                    display: "inline-block",
                    background: "black",
                    marginRight: "0.5rem",
                  }}
                ></span>
                <span style={{ fontWeight: "600", fontSize: "1.5rem" }}>
                  Lama Hồ Chí Minh:
                </span>
                <p>
                  - 12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, Thành phố Hồ Chí Minh
                </p>
              </div>

              <div>
                <span
                  style={{
                    width: "1rem",
                    height: "1rem",
                    display: "inline-block",
                    background: "black",
                    marginRight: "0.5rem",
                  }}
                ></span>
                <span style={{ fontWeight: "600", fontSize: "1.5rem" }}>
                  Lama Đà nẵng:
                </span>
                <p>- 1 Lê Đình Lý, Vĩnh Trung, Thanh Khê, Đà Nẵng</p>
              </div>
            </div>
          </div>
        </div>
      </OutletWrapper>
    </MainLayout>
  );
};

export default OutletPage;
