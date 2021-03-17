
import './App.css';
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Budget from "./Budget";
import Savings from "./Savings";
import Debt from "./Debt";

function App() {
  return (
    <div>
      <Header />
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
      <Route>
        
      </Route>

    </Switch>
     
    </div>
  );
}

export default App;
