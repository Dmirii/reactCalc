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
      transactions: JSON.parse(localStorage.getItem('calcMoney')) || [],
      description:'',
      amount:'',
      income:0,
      expens:0,
    }; 
  }

  componentWillMount(){
    this.countIncome();
  }

  componentWillUpdate(){
    this.addToLocalStorage();
   // this.countIncome();
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
    //
    // возможный варинан. считаем положительные доходы
    // return this.state.transactions
    //    .reduce((acc,item) => item.add ? item.amount + acc : acc,0)
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
  

    if(this.state.amount && this.state.description){
       transactions.push(transaction);
    }else{
      alert('Заполните поля!');
    }
    this.setState({
           transactions,
           description:'',
           amount:'',
           },() =>{
                  this.countIncome();
                  // this.addToLocalStorage();
                 });   
  }

 

  addAmount = event =>{ 
       this.setState({amount: parseFloat(event.target.value)}/*,() =>  console.log(this.state)*/)     
  }
  
  addDescription = event =>{
    this.setState({description: event.target.value},/*() =>  this.countIncome()*/)  
  }

  addToLocalStorage(){
    localStorage.setItem('calcMoney', JSON.stringify(this.state.transactions))
  }

  deleteTransaction = id =>{    
      const transactions =this.state.transactions.filter(item => item.id !== id)
    // let index =this.state.transactions.findIndex(item => item.id === id);
    // let transactions =[...this.state.transactions];
    // transactions.splice(index,1);
    this.setState({transactions:transactions},() =>{
                  this.countIncome();
                  // this.addToLocalStorage();
                });    
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
                  transactions={this.state.transactions}
                  deleteTransaction={this.deleteTransaction}
             />
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
