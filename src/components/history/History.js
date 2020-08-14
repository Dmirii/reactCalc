import React from 'react';
import HistoryItem from './HistoryItem'

const History = ({ transactions }) => (
        <section className="history">
                <h3>История расходов</h3>
                <ul className="history__list">
                {transactions.map( transaction =>  <HistoryItem 
                                                        key={transaction.id}  
                                                        id={transaction.id}                                                      
                                                        description={transaction.description}
                                                        amount={transaction.amount}
                                                        add={transaction.add} />)}
          
                </ul>
            </section>
          
    )
;

export default History;