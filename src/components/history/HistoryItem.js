import React from 'react';

const HistoryItem = ({ id, description ,amount ,add,deleteTransaction })=>(       
    
        <li key={id} className={ `history__item ${add 
                                             ?"history__item-plus"
                                             :"history__item-minus"}`
                                }> {description}
            <span className="history__money">{amount}₽</span>
            <button onClick={()=>deleteTransaction(id)} className="history__delete">x</button>
        </li>
);

export default HistoryItem;

