import { Container, Table, Header, Grid, Modal,
Button, Form } from 'semantic-ui-react'
import BudgetRow from "./BudgetRow";
import Chart from "react-google-charts";
import { useParams, useHistory} from "react-router-dom";
import IncomeRow from "./IncomeRow";
import { useState } from "react"
import PieChart from'./PieChart'


function Budget({earnings, bills, currentUser, AddNewEarning, updateEarning, updateOutgoing, handleDeleteUpdated, totalEmergancySavings, totalOutgoing, settingTotalOutgoing, outgoing}){
    const [open, setOpen] = useState(false)
    const [addNewBtn, setaddNewBtn] = useState(false)
    const [deleteIcon, setDeleteIcon] = useState(false)
    const [addProjectedForm, setAddProjectedForm] = useState({
        user_id: currentUser.id,
        income_id: "",
        pay_day: "",
        
    })
    const [afterIncomeFetch, setafterIncomeFetch] = useState({
        user_id: currentUser.id,
        income_id: "",
        pay_day: "",
        
    })
    const [newIncomeForm, setNewIncomeForm] = useState({
        income_type: "",
        name: "",
        projected: ""
    })
    // Gap Math //
    const allOutgoingTotals = outgoing.map((outgoing_inst)=> outgoing_inst.projected)
    let currentOutgoingTotal = allOutgoingTotals.reduce((result, num) =>result+num)
    settingTotalOutgoing(currentOutgoingTotal)

    const earningTotalAry = earnings.map((earning)=> earning.income.projected)
    let totalPojectedIncome = earningTotalAry.reduce((result, num) =>result+num)

    const gapTotal= totalPojectedIncome - currentOutgoingTotal

     if (gapTotal < 0){
        let adviceSec = 
        <p>Lets Focus on increasing your income and/or decreacing your spending</p>
       return (adviceSec) 
    }
    // else (totalEmergancySavings !== currentOutgoingTotal){
    //     adviceSec = 
    //     <p>Lets Focus on your Savings Goals. Any extra income should go to your Emergancy Fund</p>
    //    return (adviceSec)
    // }
    

    const earning_ist = earnings.map((earning)=>{
        return(
            <IncomeRow
                key ={earning.id}
                earning={earning}
                updateEarning={updateEarning}
            />
        )
    })

    // Type Filters //
    const filterHousing = bills.filter((bill)=> bill.outgoing.outgoing_type === "Housing")
    const housingSec = filterHousing?.map((bill)=>{
        return(
            <BudgetRow
                key={bill.id}
                bill={bill}
                updateOutgoing={updateOutgoing}
                deleteIcon={deleteIcon}
                handleDeleteUpdated={handleDeleteUpdated}
            />
        )
    })

    const filterUtilities = bills.filter((bill)=> bill.outgoing.outgoing_type === "Utilities")
    const utilitiesSec = filterUtilities?.map((bill)=>{
        return(
            <BudgetRow
                key={bill.id}
                bill={bill}
                updateOutgoing={updateOutgoing}
                deleteIcon={deleteIcon}
                handleDeleteUpdated={handleDeleteUpdated}
            />
        )
    })

    const filterTransportation = bills.filter((bill)=> bill.outgoing.outgoing_type === "Transportation")
    const transportationSec = filterTransportation?.map((bill)=>{
        return(
            <BudgetRow
                key={bill.id}
                bill={bill}
                updateOutgoing={updateOutgoing}
                deleteIcon={deleteIcon}
                handleDeleteUpdated={handleDeleteUpdated}
            />
        )
    })

    const filterInsurance = bills.filter((bill)=> bill.outgoing.outgoing_type === "Insurance")
    const insuranceSec = filterInsurance?.map((bill)=>{
        return(
            <BudgetRow
                key={bill.id}
                bill={bill}
                updateOutgoing={updateOutgoing}
                deleteIcon={deleteIcon}
                handleDeleteUpdated={handleDeleteUpdated}
            />
        )
    })

    const filterDebt = bills.filter((bill)=> bill.outgoing.outgoing_type === "Debt")
    const debtSec = filterDebt?.map((bill)=>{
        return(
            <BudgetRow
                key={bill.id}
                bill={bill}
                updateOutgoing={updateOutgoing}
                deleteIcon={deleteIcon}
                handleDeleteUpdated={handleDeleteUpdated}
            />
        )
    })

    const filterLiving = bills.filter((bill)=> bill.outgoing.outgoing_type === "Living")
    const livingsec = filterLiving?.map((bill)=>{
        return(
            <BudgetRow
                key={bill.id}
                bill={bill}
                updateOutgoing={updateOutgoing}
                deleteIcon={deleteIcon}
                handleDeleteUpdated={handleDeleteUpdated}
            />
        )
    })

    const filterMiscellaneous = bills.filter((bill)=> bill.outgoing.outgoing_type === "Miscellaneous")
    const miscellaneousSec = filterMiscellaneous?.map((bill)=>{
        return(
            <BudgetRow
                key={bill.id}
                bill={bill}
                updateOutgoing={updateOutgoing}
                deleteIcon={deleteIcon}
                handleDeleteUpdated={handleDeleteUpdated}
            />
        )
    })



    const bill_inst = bills.map((bill)=>{
        return(
            <BudgetRow
                key={bill.id}
                bill={bill}
                updateOutgoing={updateOutgoing}
                deleteIcon={deleteIcon}
                handleDeleteUpdated={handleDeleteUpdated}
            />
        )
    })

    

    const allIncomeNames = earnings.map((earning) =>earning.income.name) 
    const uniqIncomeNames = allIncomeNames.filter((name, idx)=> allIncomeNames.indexOf(name) === idx)
    
    const incomeNameOptions = uniqIncomeNames.map((incomeName) => {
        
    return(
        <option value={incomeName} >{incomeName}</option> 
     )}
     )
      
      

    function handleProjectedIncome(e){
        const earning_inst = earnings.find((earning) => earning.income.name === e.target.value)
        const incomeId =  earning_inst.income.id  
        
        const updateForm = {...addProjectedForm}
        updateForm[e.target.name] = incomeId
        setAddProjectedForm(updateForm)
        
    }

    function handleDateChange(e) {
        
        const name = e.target.name;
        let value = e.target.value;
        setAddProjectedForm({
            ...addProjectedForm,
            [name]: value,
        })
    }

    function handleAddProjected(e) {
        e.preventDefault()
        fetch("http://localhost:3000/newEarning", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(addProjectedForm),
                })
                .then((r) => r.json())
                .then((data) => {
                    AddNewEarning(data)})
                // history.push(`/trip/${trip.id}`)
        setOpen(false)
    }

    function handleClose() {
        setOpen(false) 
        setaddNewBtn(false)
    }

    function handleIncomeSelect(e) {
        
        const name = e.target.name;
        let value = e.target.value;
        setNewIncomeForm({
            ...newIncomeForm,
            [name]: value,
        })
    }

    function handleIncmeDate(e){
        const name = e.target.name;
        let value = e.target.value;
        setafterIncomeFetch({
            ...afterIncomeFetch,
            [name]: value,
        })
    }

    function handleAddIncome(e){
        e.preventDefault()
        fetch("http://localhost:3000/newIncome", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(newIncomeForm),
                })
                .then((r) => r.json())
                .then((data) => {
                    addEarning(data.id)})
                // history.push(`/trip/${trip.id}`)
        setOpen(false)
    }

    function addEarning(id) {
        
        const updateEarnig = {...afterIncomeFetch}
        updateEarnig.income_id = id
        fetch("http://localhost:3000/newEarning", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(updateEarnig),
                })
                .then((r) => r.json())
                .then((data) => {
                    AddNewEarning(data)})
                // history.push(`/trip/${trip.id}`)
        setOpen(false)
    }


    return(
        <Container>
            <Header as='h2' attached='top' textAlign='center'>
                Budget
            </Header>
            <Grid celled>
                <Grid.Column width={8} >
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Projected</Table.HeaderCell>
                                <Table.HeaderCell>Actual</Table.HeaderCell>
                                <Table.HeaderCell>Pay Day</Table.HeaderCell>
                            </Table.Row>
                            </Table.Header>

                            <Table.Body>
                            {earning_ist}
                        </Table.Body>
                    </Table>
                    <Button inverted color='green' floated='right' size='mini' onClick={()=>setOpen(true)}>
                        Add Projected Income
                    </Button>
                    <Modal
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        
                        >
                        <Modal.Header>Add Pojected Income
                            <Button inverted color='green' floated='right' centered size='mini' onClick={()=>setaddNewBtn(true)}>
                                Add New source of Income
                            </Button>
                    </Modal.Header>
                        <Modal.Content>
                            <Modal.Description>
                            {addNewBtn ?
                                <Form onSubmit={(e) => {handleAddIncome(e)}}>
                                    <Form.Field label='Select Income Type' control='select' name='income_type' onChange={(e)=>handleIncomeSelect(e)} >
                                        <option ></option>
                                        <option name="income_type" value='W2 Job'>W2 Job</option> 
                                        <option name="income_type" value='Freelance'>Freelance</option>
                                        <option name="income_type" value='Contract'>Contract</option>
                                        <option name="income_type" value='Other'>Other</option>
                                    </Form.Field>
                                    
                                    <Form.Input fluid label='Income Name' name='name' value={newIncomeForm.name} onChange={(e)=>handleIncomeSelect(e)} />
                                    <Form.Input fluid label='Projected' name='projected' value={newIncomeForm.projected} onChange={(e)=>handleIncomeSelect(e)} />
                                    <Form.Input fluid label='Pay Day YYYY/MM/DD' name='pay_day' value={afterIncomeFetch.pay_day} onChange={(e)=>handleIncmeDate(e)} />
                                </Form>
                               
                               
                                
                                
                                :
                                <Form onSubmit={(e) => {handleAddProjected(e)}}>
                                    <Form.Field label='Select Income Name' control='select' name='income_id' onChange={(e)=>handleProjectedIncome(e)} >
                                    <option ></option> 
                                        {incomeNameOptions }
                                    </Form.Field>
                                    {/* <Form.Input fluid label='Projected' placeholder='Projected' /> */}
                                    <Form.Input  label='Pay Day  YYYY/MM/DD'  name='pay_day' value={addProjectedForm.pay_day} onChange={(e)=>handleDateChange(e)}/>
                                    
                                    
                                </Form>}

                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='black' onClick={() => handleClose()} >
                            Cancel
                            </Button>
                            {addNewBtn ?
                            <Button
                            content="Add"
                            onClick={(e) => {handleAddIncome(e)}}
                            positive
                            />
                            :
                            <Button
                            content="Add"
                            onClick={(e)=>{handleAddProjected(e)}}
                            positive
                            />
                            }
                        </Modal.Actions>
                        </Modal>

                </Grid.Column>
                <Grid.Column floated='center' width= {3}style={{"text-align": "center"}}>
                    <Header style={{"text-align": "center"}}>
                        The Gap
                    </Header>
                    
                    <p>${gapTotal}</p>
                    <hr/>
                    
                    <h4>Projected Income</h4>
                    <p>${totalPojectedIncome}</p>
                    <hr/>
                    <h4>Projected Outgoing</h4>
                    <p>${totalOutgoing}</p>
                    <hr/>
                    <strong>Advice</strong>
                    

                </Grid.Column>
                <Grid.Column floated='right' width= {5}>
                    <Header style={{"text-align": "center"}}>
                        Pie Chart
                    </Header>
                        <PieChart outgoing={outgoing}/>
                    
                    <Button inverted color='green' floated='right' centered size='mini'>
                        Debt Page
                    </Button>
                </Grid.Column>
            </Grid>
            <Table celled>
                <Table.Header>
                <Table.Row>
                    {deleteIcon ? <Table.HeaderCell>Delete</Table.HeaderCell> : null}
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Projected</Table.HeaderCell>
                    <Table.HeaderCell>Actual</Table.HeaderCell>
                    <Table.HeaderCell>Due Date</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                <Table.Row style={{"background-color": "#f5f5f5"}}>
                    <Table.Cell>Housing</Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    {deleteIcon ? <Table.Cell></Table.Cell> : null }
                </Table.Row>
                {housingSec}
                <Table.Row style={{"background-color": "#f5f5f5"}}>
                    <Table.Cell>Utilities</Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    {deleteIcon ? <Table.Cell></Table.Cell> : null }
                </Table.Row>
                {utilitiesSec}
                <Table.Row style={{"background-color": "#f5f5f5"}}>
                    <Table.Cell>Transportaion</Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    {deleteIcon ? <Table.Cell></Table.Cell> : null }
                </Table.Row>
                {transportationSec}
                <Table.Row style={{"background-color": "#f5f5f5"}}>
                    <Table.Cell>Insurance</Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    {deleteIcon ? <Table.Cell></Table.Cell> : null }
                </Table.Row>
                {insuranceSec}
                <Table.Row style={{"background-color": "#f5f5f5"}}>
                    <Table.Cell>Debt</Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    {deleteIcon ? <Table.Cell></Table.Cell> : null }
                </Table.Row>
                {debtSec}
                <Table.Row style={{"background-color": "#f5f5f5"}}>
                    <Table.Cell>Living Expenses</Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    {deleteIcon ? <Table.Cell></Table.Cell> : null }
                </Table.Row>
                {livingsec}
                <Table.Row style={{"background-color": "#f5f5f5"}}>
                    <Table.Cell>Miscellaneous</Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    {deleteIcon ? <Table.Cell></Table.Cell> : null }
                </Table.Row>
                {miscellaneousSec}
                </Table.Body>
            </Table>
            <Button inverted color='green' floated='right' centered size='mini'onClick={()=>setDeleteIcon(!deleteIcon)}>
                        Delete a Budget Item
                    </Button>
        </Container>
        
    )
}
export default Budget