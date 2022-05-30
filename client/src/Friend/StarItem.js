import React from 'react';

const StarItem = ({item, onDel}) => {
    const {id, image, name, age} = item
    return (
        <li>
            <p>
                <img src={image} alt={name}/>
            </p>
            <div>
                <strong>이름 : {name} </strong>
                <span>나이 : {age} 
                <button className="single_Del_Btn" onClick={()=>onDel(id)}> 삭제 </button> </span>
                
            </div>
            
        </li>
    );
};

export default StarItem;