import React, { useState, useEffect } from "react";
import styled from "styled-components";



const Diarytext = (saveDiary, contentInfo) => {
   
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [count, countLetter] = useState(0);

    const saveTitle = (e) => {
        setTitle(e.target.value);
        saveDiary(e)
    };
    const handleContent = (e) => {
        const contentValue = e.target.value
        setContent(contentValue);
        LetterCount(contentValue);
        saveContent(e);
    };
    const LetterCount = (e) => {
        countLetter(e.length);
    }

    const saveContent = (e) => {
        saveDiary(e);
    };
    useEffect(() => {
        if (contentInfo !== 0) {
            const titleIn = contentInfo.title;
            const contentIn = contentInfo.content;
            setTitle(titleIn);
            setContent(contentIn);
        }
    }, [setTitle, setContent, contentInfo]);

return (
    <Main>
        <Title>
            제목: 
            <TypeTitle
            value={title}
            maxLength={15}
            placeholder="제목을 15자내로 입력해주세요"
            onChange={saveTitle}
            id="typeTitle"
            />
            </Title>
        <Content>
        <TypeContent
        value={content}
        maxLength={149}
        placeholder="일기를 입력해주세요"
        onChange={handleContent}
        id="typeContent"
        />
        </Content>
        <Counter id="counter">({count} / 최대 150자)</Counter>
    </Main>
    );
}

export default Diarytext;

const Main = styled.div`
// border: 5px solid black;
flex-grow: 6;
display: flex;
flex-direction: column;
`;

const Title = styled.div`
border: 3px solid black;
border-radius: 1rem;
flex-grow: 1;
margin: 1rem 1rem 1rem 1rem;
padding-left: 1rem;
display: flex;
align-items: center;
font-size: 1.5rem;
@media only screen and (max-width: 480px) {
    font-size: 1.2rem;    
    margin: 2rem 1rem 1rem 1rem;
}
`;
const TypeTitle = styled.input`
background-color: rgb(246, 246, 238);
::focus{
    outline: none;
}
border: none;
border-bottom: 1px;
margin-top: 0.2rem;
margin-left: 0.8rem;
height: 40%;
width: 70%;
font-family: "Nanum Brush Script", cursive;
font-size: 1.6rem;
display: flex;
@media only screen and (max-width: 480px) {
    font-size: 1.3rem;
}
`;

const Content = styled.div`
border: 3px solid black;
border-radius: 1rem;
flex-grow: 6;
margin: 0rem 1rem 1rem 1rem;
display: flex;
justify-content: center;
align-items: center;
@media only screen and (max-width: 480px) {
    font-size: 1.5rem;
    margin: 0rem 1rem 0rem 1rem;
}
`;

const TypeContent = styled.textarea`
border: none;
width: 95%;
height: 90%;
font-family: "Nanum Brush Script", cursive;
font-size: 1.5rem;
background-color: rgb(246, 246, 238);
outline: none;
resize: none;
line-height: 3rem;
letter-spacing: 0.5rem;
margin: 1rem 1rem 1rem 1rem;
overflow: hidden;
:focus {
 outline: none;
}
@media only screen and (max-width: 480px) {
    font-size: 1.2rem;
}
`;

const Counter = styled.div`
    margin: 0rem 1rem 1rem 1rem;
    padding-left: 0.3rem;
    color: "#aaa";
    font-size: 1rem;
@media only screen and (max-width: 480px) {
    margin: 0.2rem 3rem 2rem 1rem;
}
`;
