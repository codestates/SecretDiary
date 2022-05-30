import React from 'react';
import StarItem from './StarItem';

const StarList = ({star, onDel}) => {
    return (
        <ul>
            {
                star.map(item => <StarItem key={item.id} item={item} onDel={onDel}/>)
            }
            
        </ul>
    );
};

export default StarList;