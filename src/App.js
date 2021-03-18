
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

function App() {

  return (
    <div>
      <HeaderBar />
    <Switch>
      <Route exact path='/home'>
        <Home/> 
      </Route>
      <Route path='/dashboard/:id'>
        <Dashboard/>
      </Route>
      <Route path='/budget/:id'>
        <Budget/>
      </Route>
      <Route path='/savings/:id'>
        <Savings/>
      </Route>
      <Route path='/debt/:id'>
        <Debt/>
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
