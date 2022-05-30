import React, { useRef, useState } from 'react';

const StarInput = ({onAdd}) => {
    const nameRef = useRef()
    
    //form에 새로들어올 값들의 공간을 마련해놓는다
    const [form, setForm] = useState({
        name : '',
        age : '',
        image : ''
    })

	//여러개의 input값을 받을때는 아래와같이 value와 name을 받아 넘긴다
    const changeInput=(e)=>{
        const{ value, name} = e.target
        setForm({
            ...form,
            [name] : value
        })

    }

    const onSubmit=(e)=>{
        e.preventDefault() //섭밋후 자동 새로고침 방지
        if(!name || !age || !image) return //빈칸이 하나라도 있으면 실행 안함
        onAdd(form)

        setForm({
            name : '',
            age : '',
            image : ''
        }) //입력한 값을 넘긴뒤 from은 다시 reset
        nameRef.current.focus() //name란에 focus
    }
    
    const {name, age, image} = form

    return (
        <form className="formadd" onSubmit={onSubmit}>
            <p><label>이름 </label> : <input type="text" onChange={changeInput} value={name} name="name" ref={nameRef}/></p>
            <p><label>나이 </label> : <input type="text" onChange={changeInput} value={age} name="age"/></p>
            <p><label>사진 </label> : <input type="text" onChange={changeInput} value={image} name="image"/></p>
            <p>
                <button type="submit">추가</button>
            </p>
        </form>
    );
};

export default StarInput;