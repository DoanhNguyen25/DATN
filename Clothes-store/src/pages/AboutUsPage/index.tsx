import React from "react";
import Banner from "../../components/Banner";
import Newsletter from "../../components/Newsletter";
import MainLayout from "../../layouts/MainLayout";
import { AboutWrapper } from "./style";

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
            <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid iure nobis velit ducimus dolor. Cum mollitia autem odit quis, ad, atque nisi esse recusandae fugiat eligendi deleniti ducimus libero accusamus?
              Magnam enim veniam quo dolorem error odio reiciendis facere. Aliquid, at fuga porro aspernatur in, eos eveniet voluptatibus earum accusamus quod id enim nemo magnam soluta adipisci dolor atque officiis.
              In, esse possimus. Ea, quod, eligendi et ducimus explicabo voluptas facere sapiente repellendus omnis, corporis doloribus ut iste molestiae iusto. Provident incidunt dicta, voluptatum doloribus quia omnis impedit officiis in?
              Dolorum deleniti aliquam fuga aperiam rem eaque obcaecati assumenda consectetur blanditiis? Eum ipsam harum laudantium cupiditate excepturi, facere numquam! Quod eaque corporis aspernatur architecto rem nobis veritatis omnis a nam.</span>

          </div>
        </div>
        <div className="about__part1">
          <div className="about__part1--quotes">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam nesciunt ea, facere totam vero optio qui quas tempore recusandae? Expedita deserunt nulla dignissimos molestiae ea sequi neque unde quidem blanditiis.
          </div>
          <div className="about__part1--image">

          </div>
        </div>
        <div style={{ width: '100%', height: "40rem", background: "teal" }}>

        </div>

        <Newsletter />
      </AboutWrapper>
    </MainLayout>
  );
};

export default AboutUsPage;
