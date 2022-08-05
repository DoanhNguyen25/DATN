import styled from "styled-components";
export const HeaderWrapper = styled.div`
  border-bottom: 1px solid gray;
  .header__container {
    padding: 0rem 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
      z-index: 1;
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
        text-aligh: left !important;
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
    z-index: 2;
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
  font-size: 1.75rem;
`;
