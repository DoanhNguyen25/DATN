import styled from "styled-components";

export const AboutWrapper = styled.div`

.about__introduce{
    width: 100%;
    text-align: center;
    margin-top: 5rem;
    margin-bottom: 6rem;
    &--title{
        font-size: 2.5rem;
        font-weight: 600;
        color:teal;
        margin-bottom: 1rem;
    }

    &--text{
        padding:0 300px;
        text-align: justify;
        letter-spacing: 1px;
        line-height: 1.5;
        font-style: italic;
        font-size: 1.25rem;
    }
}

.about__part1{
    width:100%;
    height: 30rem;
    display: flex;

    &--quotes{
        flex:1;
        background-color: red;
    }

    &--image{
        flex:1;
        height: 100%;
        background-image: url('https://i.imgur.com/1SAiqAP.jpeg');
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        background: green;
    }
}

`