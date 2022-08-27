import styled from "styled-components";

interface Props {
  visible: boolean;
}
export const Wrapper = styled.div<Props>`
   position:fixed;
   bottom: 2rem;
   right: 2rem;
   transition:all .3s;
   opacity:${(props) => (props.visible ? 0.8 : 0)};
   transform:${(props) =>
     props.visible ? "translateY(0px)" : "translateY(100px)"};

   &:hover{
       opacity:1;
   }

   .btn--scroll{
       font-size:2rem;
       cursor:pointer;
        border-radius:0.25rem;

       svg{
           cursor:pointer;
       }
   }
`;
