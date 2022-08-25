import { Facebook, Instagram, MailOutline, Phone, Room } from "@material-ui/icons";
import { Google } from "@mui/icons-material";
import React from "react";
import {
  ContactItem,
  FooterCenter,
  FooterLeft,
  FooterRight,
  FooterWrapper,
  List,
  ListItem,
  Payment,
  SocialContainer,
  SocialIcon,
  Title,
} from "./style";

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterLeft>
        <div className="footer__left--logo">DoanhNguyen</div>
        <div className="footer__left--desc">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius,
          quaerat! Assumenda neque cumque officiis, animi ea saepe quibusdam
          tenetur reiciendis quidem, eligendi dolore repellendus tempora
          excepturi consectetur nulla laborum illo.
        </div>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Google />
          </SocialIcon>
        </SocialContainer>
      </FooterLeft>
      <FooterCenter>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </FooterCenter>
      <FooterRight>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> 10, ngõ 132 cầu giấy, hà nội
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> +1 234 56 78
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} /> doanh.nguyendinh@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </FooterRight>
    </FooterWrapper>
  );
};

export default Footer;
