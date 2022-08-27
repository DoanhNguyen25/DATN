import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { ContactWrapper } from "./style";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import SendIcon from "@mui/icons-material/Send";

const ContactPage = () => {
  return (
    <MainLayout>
      <ContactWrapper>
        <div style={{ width: "100%", overflow: "hidden", marginTop: "1rem" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.473663080189!2d105.73291275066462!3d21.053735992231903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345457e292d5bf%3A0x20ac91c94d74439a!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBIw6AgTuG7mWk!5e0!3m2!1svi!2s!4v1661527122103!5m2!1svi!2s"
            width="100%"
            height="450"
            loading="lazy"
            allowFullScreen={true}
            style={{ border: "none" }}
          ></iframe>
        </div>
        <div className="contact__container">
          <div className="contact__info">
            <div className="contact__info--title">Liên hệ với chúng tôi</div>
            <br />
            <div className="contact__info--desc">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur
              animi facere itaque consequatur repudiandae busdam osit quifficiis
              omnis aperiam neque mollitia cupiditate magni.
            </div>
            <br />
            <div>
              <span
                style={{
                  color: "teal",
                  fontSize: "1.25rem",
                  marginBottom: "0.75rem",
                  display: "block",
                }}
              >
                Lama Store
              </span>
              <div style={{ display: "flex", alignItems: "center" }}>
                <EmailIcon style={{ color: "teal" }} />: lamastore@gmail.com
              </div>
              <div>
                <LocalPhoneIcon style={{ color: "teal" }} />: +84 19319071
              </div>
            </div>
            <br />
            <div>
              <span
                style={{
                  color: "teal",
                  fontSize: "1.25rem",
                  marginBottom: "0.75rem",
                  display: "block",
                }}
              >
                Doanh Nguyễn
              </span>
              <div style={{ display: "flex", alignItems: "center" }}>
                <EmailIcon style={{ color: "teal" }} />
                :doanhnguyen2507@gmail.com
              </div>
              <div>
                <LocalPhoneIcon style={{ color: "teal" }} />: +84 19319071
              </div>
            </div>
          </div>
          <div className="contact__form">
            <form style={{ width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <input
                  type="text"
                  name="fullname"
                  style={{ width: "40%", padding: "0.5rem 1.25rem" }}
                  placeholder="Fullname"
                />
                <input
                  type="text"
                  name="email"
                  style={{ width: "40%", padding: "0.5rem 1.25rem" }}
                  placeholder="Email"
                />
              </div>
              <input
                type="text"
                name="message"
                placeholder="Message"
                style={{
                  width: "92.75%",
                  padding: "0.5rem 1.25rem",
                  height: "6rem",
                  marginTop: "2rem",
                }}
              />

              <button type="submit">
                Gửi thông tin{"  "}{" "}
                <SendIcon style={{ marginLeft: "0.5rem" }} />
                {"  "}
              </button>
            </form>
          </div>
        </div>
      </ContactWrapper>
    </MainLayout>
  );
};

export default ContactPage;
