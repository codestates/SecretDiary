import React, { useRef, useState } from 'react';
import StarInput from './StarInput';
import StarList from './StarList';
// import '../css/style.css';
import data from '../data/friend'; //초기 데이터 import

const Stars = () => {
    const no = useRef(data.length+1) // 고유 id가 될 no는 데이터.length +1
    const [star, setStar] = useState(data) // 데이터 상태
    const [chk, setChk] = useState(false) // 우상단에 checkbox 상태

	//체크박스의 체크 유무 값(checked)으로 setChk를 설정해준다
    const changeCheck= (e)=>{
        const {checked} = e.target
        setChk(checked) 
    }

    const onDel=(id)=>{
        setStar(star.filter(star => star.id !== id))
    }

    const onReset=()=>{setStar(data)}	//초기 복구
    const onRemove=()=>{setStar([])}	//모두 삭제

	//여러 키:값을 받기때문에 form으로 전체 데이터를 받아오는데 id의 경우 따로 추가
    const onAdd=(form)=>{
        form.id = no.current++
        setStar(star.concat(form))
    }

    return (
        <div className="wrap">
            <h1>총 인원 : {star.length} </h1>
            <span className="chk">
            <input type="checkbox" onChange={changeCheck}/>
            {
                chk? "숨기기" : "보이기"
            }
            </span>
            <StarList star={star} onDel={onDel}/>
            <p className="btn">
                <button onClick={onRemove}>모두 삭제</button>
                <button onClick={onReset}>초기 복구</button>
            </p>
            {
                chk && <StarInput onAdd={onAdd}/>
            }
        </div>
    );
};

export default Stars;