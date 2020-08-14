import React, { Component } from 'react';
import Total from './components/total/Total';
import History from './components/history/History';
import Operation from './components/operation/Operation';



class App extends Component  {

  constructor(props){
    super(props);
    this.headerName = props.headerName;
    this.mainSection = props.mainSection;

    this.state={
      transactions:[],
      description:'',
      amount:'',
      income:0,
      expens:0,
    };
  }

  // считаем доходы и расходы
  countIncome= () =>{
    
    let incomeCount =0;    
    let expensCount =0;
    this.state.transactions.forEach(item =>{
      if(item.add){
         incomeCount+= +item.amount;
        }else {
          expensCount+= +item.amount;
        }     
    });
    this.setState({income: incomeCount});
    this.setState({expens: expensCount});

  }

  // метод для занесения транзакцйи в стейт
  addTransaction = add => {    

    const transactions = [...this.state.transactions];
    const transaction ={
      id : `cmr${(+new Date()).toString(16)}`,
      description : this.state.description,
      amount : this.state.amount,
      add : add,
    };

    if(this.state.amount &&this.state.description){
       transactions.push(transaction);
    }else{
      alert('Заполните поля!');
    }
    this.setState({
           transactions,
           description:'',
           amount:'',
           },() =>  this.countIncome());   
  }

 

  addAmount = event =>{
    this.setState({amount: event.target.value}/*,() =>  console.log(this.state)*/)  
  }
  
  addDescription = event =>{
    this.setState({description: event.target.value},/*() =>  this.countIncome()*/)  
  }

  render(){
    
    return ( 
      <React.Fragment>
        <header>
          <h1>{this.headerName}</h1>
          <h2>{this.mainSection}  </h2>
        </header>
        <main>   
        <div className="container">
        
             <Total
                  expens={this.state.expens}
                  income={this.state.income}
             />
             <History
                  transactions={this.state.transactions} />
             <Operation 
                  addTransaction={this.addTransaction}
                  addAmount={this.addAmount}        
                  addDescription={this.addDescription}      
                  description={this.state.description}
                  amount={this.state.amount}                 
            />          
  
          </div> 
          </main>
      </React.Fragment>
    );
  }
}

export default App;
