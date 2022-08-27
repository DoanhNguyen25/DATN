import React from "react";
import Banner from "../../components/Banner";
import Newsletter from "../../components/Newsletter";
import MainLayout from "../../layouts/MainLayout";
import { AboutWrapper } from "./style";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import icon1 from "../../assets/icon_policy_2.png";
import icon2 from "../../assets/icon_policy_3.png";

const AboutUsPage = () => {
  return (
    <MainLayout>
      <AboutWrapper>
        <Banner />
        <div className="about__introduce">
          <div className="about__introduce--title">
            <span>Giới thiệu</span>
          </div>
          <div className="about__introduce--text">
            <span>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid
              iure nobis velit ducimus dolor. Cum mollitia autem odit quis, ad,
              atque nisi esse recusandae fugiat eligendi deleniti ducimus libero
              accusamus? Magnam enim veniam quo dolorem error odio reiciendis
              facere. Aliquid, at fuga porro aspernatur in, eos eveniet
              voluptatibus earum accusamus quod id enim nemo magnam soluta
              adipisci dolor atque officiis. In, esse possimus. Ea, quod,
              eligendi et ducimus explicabo voluptas facere sapiente repellendus
              omnis, corporis doloribus ut iste molestiae iusto. Provident
              incidunt dicta, voluptatum doloribus quia omnis impedit officiis
              in? Dolorum deleniti aliquam fuga aperiam rem eaque obcaecati
              assumenda consectetur blanditiis? Eum ipsam harum laudantium
              cupiditate excepturi, facere numquam! Quod eaque corporis
              aspernatur architecto rem nobis veritatis omnis a nam.
            </span>
          </div>
        </div>
        <div className="about__part1">
          <div className="about__part1--quotes">
            <div className="quotes__container">
              <h1>LAMA STORE</h1>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
              nesciunt ea, facere totam vero optio qui quas tempore recusandae?
              Expedita deserunt nulla dignissimos molestiae ea sequi neque unde
              quidem blanditiis.
            </div>
          </div>
          <div className="about__part1--image">
            <img src="https://i.imgur.com/1SAiqAP.jpeg" alt="" />
          </div>
        </div>
        <div className="about__enumeration">
          <div className="about__enumeration--list">
            <div className="about__enumeration--item">
              <div>
                <LocalShippingOutlinedIcon
                  style={{ fontSize: "5rem", color: "teal" }}
                />
              </div>
              <div style={{ fontWeight: "bold" }}>
                Freeship cho đơn hàng trên 400k
              </div>
            </div>
            <div className="about__enumeration--item">
              <div>
                <PaymentOutlinedIcon
                  style={{ fontSize: "5rem", color: "teal" }}
                />
              </div>
              <div style={{ fontWeight: "bold" }}>Hỗ trợ thanh toán online</div>
            </div>
            <div className="about__enumeration--item">
              <div>
                <CurrencyExchangeOutlinedIcon
                  style={{ fontSize: "5rem", color: "teal" }}
                />
              </div>
              <div style={{ fontWeight: "bold" }}>
                Đổi trả trong vòng 7 ngày
              </div>
            </div>
          </div>
        </div>

        <Newsletter />
      </AboutWrapper>
    </MainLayout>
  );
};

export default AboutUsPage;
