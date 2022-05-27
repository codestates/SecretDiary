import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import sunny from "../image/weather/1.png"
import rainy from "../image/weather/2.png"
import cloudy from "../image/weather/3.png"
import windy from "../image/weather/4.png"
import snowy from "../image/weather/5.png"


export default function Diaryinfo({conveyWeather, contentInfo}) {
const [weather ,setWeather] = useState()
const [weatherChangeable, setWChangeable] = useState(true);
const [wSunny, setWSunny] = useState(false);
const [wRainy, setWRainy] = useState(false);
const [wCloudy, setWCloudy] = useState(false);
const [wWindy, setWWindy] = useState(false);
const [wSnowy, setWSnowy] = useState(false);
const Today = () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const week = ["일","월","화","수","목","금","토"];
    const dayOfWeek = week[new Date(`${year}-${month}-${day}`).getDay()];
    return `${year}년 ${month}월 ${day}일 ${dayOfWeek}요일`;
}

const [diarydDate, setDiarydDate] = useState(Today());

function changeWeather(weatherId) {
    if (weatherId === "cloudy") {
        if(!wCloudy) {
            setWCloudy(true);
            setWSunny(false);
            setWWindy(false);
            setWSnowy(false);
            setWRainy(false);
        } else {
            setWCloudy(false)
            }
        } else if (weatherId === "sunny") {
            if(!wSunny){
                setWCloudy(false);
                setWSunny(true);
                setWRainy(false);
                setWSnowy(false);
                setWWindy(false);
            } else {
                setWSunny(false);
            }
        } else if (weatherId === "rainy") {
            if (!wRainy) {
                setWCloudy(false);
                setWSunny(false);
                setWRainy(true);
                setWSnowy(false);
                setWWindy(false);
            } else {
                setWRainy(false);
            }
        } else if (weatherId === "snowy") {
            if(!wSnowy){
                setWCloudy(false);
                setWSunny(false);
                setWRainy(false);
                setWSnowy(true);
                setWWindy(false);
            } else {
                setWSnowy(false);
            }
        } else if (weatherId === "windy") {
            if(!wWindy) {
                setWCloudy(false);
                setWSunny(false);
                setWRainy(false);
                setWSnowy(false);
                setWWindy(true);
            } else {
                setWWindy(false);
            }
        }
    }
	  

  
    return (
        <Main>
            <DateWeather>
            <Todaydate theme={weatherChangeable}>
					<div>{diarydDate}</div>
				</Todaydate>
                 <Weather theme={weatherChangeable}>
                 <Image>
						<WeatherImg id="cloudy" src={cloudy} theme={wCloudy} onClick={setWeather} />
					</Image>
					<Image>
						<WeatherImg id="sunny" src={sunny} theme={wSunny} onClick={setWeather} />
					</Image>
					<Image>
						<WeatherImg id="rainy" src={rainy} theme={wRainy} onClick={setWeather} />
					</Image>
					<Image>
						<WeatherImg id="snowy" src={snowy} theme={wSnowy} onClick={setWeather} />
					</Image>
					<Image>
						<WeatherImg id="windy" src={windy} theme={wWindy} onClick={setWeather} />
					</Image>
                    </Weather>
            </DateWeather>
        </Main>
    )
}
Diaryinfo.propTypes = {
	conveyWeather: PropTypes.any,
	contentInfo: PropTypes.any,
}


const Main = styled.div`
	border: 3px solid black;
    margin: 1rem 1rem 1rem 1rem;
    border-radius: 0.5rem;
	flex-grow: 0.5;
	display: flex;
	@media only screen and (max-width: 480px) {
		height: 20%;
	}
`;
const DateWeather = styled.div`
	/* border-bottom: 3px solid red; */
	flex-grow: 1;
	display: flex;
	flex-direction: column;
`;
const Todaydate = styled.div`
	border-bottom: ${(props) => (props.theme === true ? "3px solid black" : "none")};
	display: flex;
	height: 100%;
	padding: 0.3rem 0.7rem;
	justify-content: center;
	align-items: center;
	font-size: 1.3rem;
	font-weight: bold;
	letter-spacing: 0.5rem;
	@media only screen and (max-width: 480px) {
		font-size: 1rem;
		padding-left: 1rem;
		letter-spacing: 0.2rem;
	}
`;
const Weather = styled.div`
	/* border-bottom: 3px solid black; */
	display: ${(props) => (props.theme === true ? "flex" : "none")};
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	@media only screen and (max-width: 480px) {
		width: 100%;
		height: 60%;
	}
`;
const Image = styled.div`
	/* border: 3px solid red; */
	width: 4rem;
	display: flex;
	justify-content: center;
	#rainy {
		width: 3.3rem;
		@media only screen and (max-width: 480px) {
			width: 2.5rem;
		}
	}
	#snowy {
		width: 3.3rem;
		@media only screen and (max-width: 480px) {
			width: 1.9rem;
		}
	}

    #sunny {
        width: 4.3rem;
        @media only screen and (max-width: 480px) {
            width: 2.5rem;
        }
    }
	@media only screen and (max-width: 480px) {
		margin-right: 0rem;
		width: 2.5rem;
	}
`;
const WeatherImg = styled.img`
	/* border: 3px solid black; */
	width: 3.5rem;
	alt: "";
	:hover {
		cursor: pointer;
	}
	animation: ${(props) => (props.theme === true ? "motion 0.35s linear 0s infinite alternate" : "")};
	margin-top: 0;
	@keyframes motion {
		0% {
			margin-left: 0px;
		}
		100% {
			margin-right: 15px;
		}
	}
	@media (max-width: 480px) {
		width: 2.3rem;
		margin: 0.1rem;
	}
`;


