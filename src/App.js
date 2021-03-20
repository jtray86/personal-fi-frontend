
import './App.css';
import { Switch, Route } from "react-router-dom";
import HeaderBar from "./HeaderBar";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Budget from "./Budget";
import Savings from "./Savings";
import Debt from "./Debt";
import SavingForm from "./SavingForm";
import DebtForm from "./DebtForm";
import BudgetForm from "./BudgetForm";
import { useState, useEffect } from "react";

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [debts, setDebts] = useState([])
  const [earnings, setEarnings] = useState([])
  const [bills, setBills] = useState([])
  const [deposits, setDeposits]= useState([])

  // auto-login
  useEffect(() => {
    fetch("http://localhost:3000/me")
      .then((r) => r.json())
      .then(setCurrentUser);
  }, []);

  useEffect(()=>{
    if (currentUser){
      fetch(`http://localhost:3000/debt/${currentUser.id}`)
      .then((r)=>r.json())
      .then((debts) => 
      setDebts(debts)
      )
    }
  },[currentUser])
  
  useEffect(()=>{
    if (currentUser){
      fetch(`http://localhost:3000/earning/${currentUser.id}`)
      .then((r)=>r.json())
      .then((earning) => 
      setEarnings(earning)
      )
    }
  },[currentUser])
 
  useEffect(()=>{
    if (currentUser){
      fetch(`http://localhost:3000/bill/${currentUser.id}`)
      .then((r)=>r.json())
      .then((bills) => 
      setBills(bills)
      )
    }
  },[currentUser])

  useEffect(()=>{
    if (currentUser){
      fetch(`http://localhost:3000/deposit/${currentUser.id}`)
      .then((r)=>r.json())
      .then((deposits) => 
      setDeposits(deposits)
      )
    }
  },[currentUser])

  

return (
    <div>
      <HeaderBar setCurrentUser={setCurrentUser} currentUser={currentUser} />
    <Switch>
      <Route exact path='/home'>
        <Home/> 
      </Route>
      <Route path='/dashboard/:id'>
        <Dashboard debts={debts} currentUser={currentUser} deposits={deposits}/>
      </Route>
      <Route path='/budget/:id'>
        <Budget earnings={earnings} bills={bills}/>
      </Route>
      <Route path='/savings/:id'>
        <Savings/>
      </Route>
      <Route path='/debt/:id'>
        <Debt debts={debts} currentUser={currentUser}/>
      </Route>
      <Route path='/savingsForm'>
        <SavingForm/>
      </Route>
      <Route path='/debtForm'>
        <DebtForm/>
      </Route>
      <Route path='/budgetForm'>
        <BudgetForm/>
      </Route>

    </Switch>
     
    </div>
  );
}

export default App;
