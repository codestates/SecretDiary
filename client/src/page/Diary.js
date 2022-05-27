import React,{useState, useEffect} from 'react';
// import CanvasDraw from 'react-canvas-draw';
import { useNavigate } from "react-router-dom";
import Canvasdraw from '../component/Canvasdraw';
import Diaryinfo from '../component/Diaryinfo';
import styled from "styled-components";
import Diarytext from '../component/Diarytext';
import axios from 'axios';



const Diary = ({weatherData, imageUrl, imageData, contentInfo}) => {
  const history = useNavigate();
  const [diaryTitle, setTitle] = useState("");
  const [diaryContent, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [msgVisible, setMsgVisible] = useState("");

  const saveDiary = (e) => {
    const Id = e.target.Id;
    const value = e.target.value;

    if(Id === "typeTitle") {
      setTitle(value);
    } else if (Id === "typeContent") {
      setContent(value)
    }
  };

  const setTime = () => {
    setTimeout(() => {
      setMsgVisible(false);
    }, 1500);
  };

  const handleSubmit = async() => {
    const isLoginSession = JSON.parse(sessionStorage.getItem("isLogin") || "1");
    const accessToken =  sessionStorage.getItem("accessToken")
    if(isLoginSession !== true) {
      setMessage("로그인을 해주세요")
      setMsgVisible(true);
      setTime();
      return;
    }
    if(contentInfo === 0) {
      if (weatherData === "") {
        setMessage("날씨를 선택해주세요");
        setMsgVisible(true);
        setTime();
        return;
      }
      if(imageUrl === "" || imageData === "") {
        setMessage("완료버튼을 눌러주세요");
        setMsgVisible(true);
        setTime();
        return;
      }
      if(diaryTitle === "") {
        setMessage("제목을 입력해주세요");
        setMsgVisible(true);
        setTime()
        return;
      }
      if(diaryContent === "") {
        setMessage("일기를 입력해주세요");
        setMsgVisible(true);
        setTime();
        return
      }
    } else if (contentInfo !== 0) {
      if(imageUrl === "" || imageData === "") {
        setMessage("완료버튼을 눌러주세요")
        setMsgVisible(true);
        setTime();
        return;
      }
      if(diaryTitle === "") {
        setMessage("제목을 수정해주세요");
        setMsgVisible(true);
        setTime();
        return;
      }
      if(diaryContent === "") {
        setMessage("일기를 수정해주세요");
        setMsgVisible(true);
        setTime();
        return;
        }
    }
    if(contentInfo !== 0) {
      const dayWeather = contentInfo.weather;
      await axios
       .patch(
         "https://server.secretdiary.org/diary/udiary",
         {
           weather: dayWeather,
           imgUrl: imageUrl,
           imgMian: imageData,
           title: diaryTitle,
           content: diaryContent,
           contentId: contentInfo.id
         },
         {
           headers: {
             Authorization: `Bearer ${accessToken}`,
             "Content-Type": "appliaction/json",
             withCredentials: true,
           },
         }
       )
       .then((res) => {
         if(res.data.message === "successfully revised") {
           setMessage("그림일기가 수정되었습니다")
           setMsgVisible(true);
           sessionStorage.setItem("visible");
           setTimeout(()=>{
             window.location.href = "/diary"
           },1500)
         }
       })
       .catch((err) => {
         console.log("Internal Server Error occured")
       })
    } else {
      await axios
      .post(
        "https://server.secretdiary.org/diary/cdiary",
        {
          weather: weatherData,
          imgUrl: imageUrl,
          imgMian: imageData,
          title: diaryTitle,
          content: diaryContent,
          contentId: contentInfo.id
        },
        {
          headers:{
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "appliaction/json",
            withCredentials: true,
            },
        }
      )
      .then((res) => {
        if(res.data.message === "ok") {
          setMessage("그림일기가 등록되었습니다");
          setMsgVisible(true);
          sessionStorage.setItem("visible");
          setTimeout(() => {
            window.location.href = "/diay"
          }, 1500);
        }
      })
      .catch((err) => {
        console.log("Internal Server Error occured")
      })
    }

  };
  



useEffect(() => {

})

  return (
    <Main>
      <Diaryinfo saveDiary={saveDiary} contentInfo={contentInfo}/>
     <Canvasdraw></Canvasdraw>
     <Diarytext></Diarytext>
     <Buttons>
      <Button onClick={handleSubmit}>등록하기</Button>
      </Buttons>
    </Main>
  );
}

export default Diary;

const Main = styled.div`
background-color: #f6f6ee;
box-sizing: border-box;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
flex-grow: 1;
@media only screen and (max-width: 480px) {
  min-width: 400px;
  height: 70%
}
`;

const Buttons = styled.div`
	flex-grow: 0.5;
	padding-right: 1rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
`;

const Button = styled.button`
	border: 2px solid black;
	background: #f6f6ee;
	margin-right: 1rem;
  margin-bottom: 1rem;
	font-size: 1rem;
	font-weight: bold;
	:hover {
		cursor: pointer;
		background: black;
		color: #f6f6ee;
		transition: all 1s;
	}
	@media only screen and (max-width: 480px) {
		font-size: 0.8rem;
	}
`;