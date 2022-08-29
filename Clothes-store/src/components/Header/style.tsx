import styled from "styled-components";

export const HeaderWrapper = styled.div<{ visible: boolean }>`
  /* border-bottom: 1px solid gray; */
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  position: ${(props) => (props.visible ? "sticky" : "relative")};
  top: 0;
  z-index: ${(props) => (props.visible ? "999" : "99")};
  background: #fff;
  .header__container {
    padding: ${(props) => (!props.visible ? "0.5rem 4rem" : "0rem 4rem")};
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s;

    &--search {
      border: 1px solid lightgray;
      display: flex;
      align-items: center;
      margin-left: 5rem;
      padding: 0.5rem;
    }
  }
`;

export const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  a {
    text-decoration: none;
  }
`;
export const Input = styled.input`
  border: none;
  outline: none;
`;

export const Center = styled.div`
  flex: 2;
  text-align: center;

  .navbar__menu {
    display: flex;
    height: 3rem;
    padding-inline-start: 0 !important;
    margin-block-start: 0em;
    margin-block-end: 0em;
    justify-content: center;
    position: relative;

    li {
      flex: 0 0 15%;
      list-style: none;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s;

      a {
        text-decoration: none;
        color: #000;
      }
      &:first-child {
        flex: 0 0 10%;
        list-style: none;
        height: 100%;
      }

      &:hover {
        text-decoration: underline;
      }

      &:hover .navbar__submenu {
        opacity: 1;
      }
    }
    .navbar__submenu {
      background: teal;
      position: absolute;
      z-index: 9999;
      top: 103%;
      right: 56%;
      display: flex;
      flex-direction: column;
      padding-inline-start: 0 !important;
      text-align: left;
      padding-top: 1rem;
      opacity: 0;
      transition: all 0.3s;
      &:before {
        content: "";
        width: 1rem;
        height: 1rem;
        background: teal;
        position: absolute;
        top: -0.5rem;
        left: 1rem;
        transform: rotate(45deg);
      }
      li {
        text-align: left !important;
        display: flex;
        justify-content: flex-start;
        padding: 0.5rem 1rem;
        display: block;
        cursor: pointer;
        color: white;
        transition: all 0.4s;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

export const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const MenuItem = styled.div<{ isOpen?: Boolean }>`
  font-size: 0.875rem;
  cursor: pointer;
  margin-left: 25px;
  position: relative;

  .user__menu {
    background: teal;
    position: absolute;
    z-index: 9999;
    right: -1rem;
    top: 2.5rem;
    color: #fff;
    display: ${(props) => (props.isOpen ? "block" : "none")};

    &--item {
      width: 8rem;
      padding: 0.5rem 0.5rem;
      text-transform: capitalize;
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }

    &:after {
      content: "";
      width: 1rem;
      height: 1rem;
      position: absolute;
      background: teal;
      transform: rotate(45deg);
      top: -7px;
      right: 16px;
    }
  }
`;

export const Logo = styled.span`
  font-weight: bold;
  font-size: 2.75rem;
`;
