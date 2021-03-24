
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
  const [savings, setSavings] = useState([])
  const [earnings, setEarnings] = useState([])
  const [bills, setBills] = useState([])
  const [deposits, setDeposits]= useState([])
  const [transactions, setTransactions]= useState([])
  const [totalOutgoing, setTotalOutgoing] =useState(null)
  const [totalEmergancySavings, setTotalEmergancySavings] =useState(null)
  const [theGap, setTheGap]= useState({gap:'',income:'',outgoing:''})
  const [outgoing, setOutgoing]=useState([])

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
      fetch(`http://localhost:3000/saving/${currentUser.id}`)
      .then((r)=>r.json())
      .then((savings) => 
      setSavings(savings)
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

  
  
  useEffect(()=>{
    if (currentUser){
      fetch(`http://localhost:3000/transaction/${currentUser.id}`)
      .then((r)=>r.json())
      .then((transactions) => 
      setTransactions(transactions)
      )
     
    }
  },[currentUser])

  useEffect(()=>{
    if (currentUser){
      fetch(`http://localhost:3000/outgoing/${currentUser.id}`)
      .then((r)=>r.json())
      .then((outgoing) => 
      setOutgoing(outgoing)
      )
      
   
    }
  },[currentUser])



  function settingTotalOutgoing(currentOutgoingTotal) {

      setTotalOutgoing(currentOutgoingTotal)
  }

  
  

    function AddNewEarning(earning){
      const newEarning = [...earnings, earning]
      setEarnings(newEarning)
    }

    function updateEarning(newEarning) {
      const newEarningAry = earnings.filter((earning) =>earning.id !== newEarning.id)
      setEarnings([...newEarningAry, newEarning])
    }

    function updateOutgoing(newBill) {
      const newBillAry = bills.filter((bill) =>bill.id !== newBill.id)
      setBills([...newBillAry, newBill])
    }

    function updateDebts(updateDebt) {
      const filteredDebt = debts.filter((debt)=> debt.id !== updateDebt.id)
      setDebts([...filteredDebt, updateDebt])
    }
    
          
    function setTotalEmergancy(currentSavingsTotal) {
      setTotalEmergancySavings(currentSavingsTotal)
    }

    function handleAddDeposits(newDeposit){
      const newDepositAry = [...deposits, newDeposit]
      setDeposits(newDepositAry)
    }
    function updateSavingsTotal(SavingUpdatedTotal){
      const filteredSaving = savings.filter((saving)=> saving.id !== SavingUpdatedTotal.id)
      setSavings([...filteredSaving, SavingUpdatedTotal])

    }

    function handleDeleteUpdated(deletedOutgoing){
      const newBillsAry = bills.filter((bill)=>bill.outgoing.id !== deletedOutgoing.id)
      setBills([...newBillsAry])

      const newOutgoingAry = outgoing.filter((outgoing_inst) => outgoing_inst.id !== deletedOutgoing.id)
      setOutgoing([...newOutgoingAry])
    }
  
    function handleGapChange(){

    }

return (
    <div>
      <HeaderBar setCurrentUser={setCurrentUser} currentUser={currentUser} />
    <Switch>
      <Route exact path='/home'>
        <Home/> 
      </Route>
      <Route path='/dashboard/:id'>
        <Dashboard debts={debts} currentUser={currentUser} deposits={deposits} savings={savings}  bills={bills} outgoing={outgoing} setTotalEmergancy={setTotalEmergancy} settingTotalOutgoing={settingTotalOutgoing} earnings={earnings}/>
      </Route>
      <Route path='/budget/:id'>
        <Budget  handleGapChange={handleGapChange} earnings={earnings} bills={bills} currentUser={currentUser} AddNewEarning={AddNewEarning} updateEarning={updateEarning} updateOutgoing={updateOutgoing} totalOutgoing={totalOutgoing} settingTotalOutgoing={settingTotalOutgoing} outgoing={outgoing} handleDeleteUpdated={handleDeleteUpdated}/>
      </Route>
      <Route path='/savings/:id'>
        <Savings currentUser={currentUser} deposits={deposits} totalOutgoing={totalOutgoing} totalEmergancySavings={totalEmergancySavings} handleAddDeposits={handleAddDeposits} updateSavingsTotal={updateSavingsTotal} setTotalEmergancy={setTotalEmergancy} savings={savings}/>
      </Route>
      <Route path='/debt/:id'>
        <Debt debts={debts} currentUser={currentUser} transactions={transactions} updateDebts={updateDebts}/>
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
