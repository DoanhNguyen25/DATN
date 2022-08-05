import styled from "styled-components";

export const CategoryItemWrapper = styled.div`
    flex:1;
    height:70vh;
    margin:3px;
    position:relative;

    img{
        width:100%;
        height:100%;
        object-fit:cover;
    }
`

export const Info = styled.div`
    position:absolute;
    width:100%;
    height:100%;
    top:0;
    left:0;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;

    h1{
        color:#fff
    }
`