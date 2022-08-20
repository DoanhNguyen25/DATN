import React, { useState } from "react";
import Title from "../common/Title";
import { NewsletterWrapper } from "./style";
import SendIcon from "@mui/icons-material/Send";
import CustomButton from "../common/Button";
import { SendMail } from "../../api/UserApi";
import { toast } from "react-toastify";
const Newsletter = () => {
  const [email, setEmail] = useState<string>("");
  const handleSendMail = async () => {
    try {
      const req = await SendMail("http://localhost:8000/api/sendmail", email);
      if (req.data) {
        toast.success("gửi mail thành công!");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <NewsletterWrapper>
      <Title title="Đăng kí thành viên mới" />
      <p>Nhận thông tin mới nhất từ sản phẩm mà bạn yêu thích</p>
      <div className="input__container">
        <input
          type="text"
          placeholder="Enter your email"
          onChange={(e: any) => setEmail(e.target.value)}
          value={email}
        />
        <CustomButton
          style={{
            display: "flex",
            alignItems: "center",
            border: "none",
            background: "teal",
            color: "white",
          }}
          onClick={handleSendMail}
        >
          <SendIcon />
        </CustomButton>
      </div>
    </NewsletterWrapper>
  );
};

export default Newsletter;
