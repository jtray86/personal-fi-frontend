import { Container, Header, Grid, Button, Table, Progress, Modal, Form, currentUser } from 'semantic-ui-react'
import {useState} from 'react'
import SavingForm from './SavingForm'
import SavingRow from './SavingsRow'

function Savings({totalOutgoing, deposits, totalEmergancySavings, currentUser, handleAddDeposits, updateSavingsTotal, setTotalEmergancy, savings }){
    const [open, setOpen] = useState(false)
    const [depositForm, setDepositForm] = useState({
        user_id: currentUser.id,
        saving_id: '',
        deposit_date: '',
        amount: ''
    })

    const emergancyFundFilter = deposits.filter((deposit)=> deposit.saving.saving_type === "Emergancy Savings")
    const allSavingsNames = emergancyFundFilter.map((deposit) =>deposit.saving.name) 
    const uniqSavingNames = allSavingsNames.filter((name, idx)=> allSavingsNames.indexOf(name) === idx)
    
    const leftTillGoal = totalOutgoing - totalEmergancySavings

    const percenageToGoal = (totalEmergancySavings/totalOutgoing) *100

    const depositNameOptions = uniqSavingNames.map((saving) => {
        
        return(
            <option value={saving} >{saving}</option> 
         )}
         )

    function handleDepositChange(e) {
        
        const name = e.target.name;
        let value = e.target.value;
        setDepositForm({
            ...depositForm,
            [name]: value,
        })
        
    }

    function handleDepositSelect(e){
        const savingIst = deposits.find((depost)=> depost.saving.name === e.target.value)
        const savingId = savingIst.saving.id

        const updateDeposit= {...depositForm}
        updateDeposit[e.target.name] = savingId
        setDepositForm(updateDeposit)
        
    }

    const emergancySavingsFundFilter = savings.filter((saving)=> saving.saving_type === "Emergancy Savings")
      const emergancy_savings_amounts = emergancySavingsFundFilter.map((saving) => saving.amount)
     
      const TotalEmSaving= emergancy_savings_amounts.reduce((result, num) =>result+num)
      
      setTotalEmergancy(TotalEmSaving)


    
    function handleDepositSubmit(e) {
        e.preventDefault()
        fetch(`http://localhost:3000/deposit`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(depositForm),
                })
                .then((r) => r.json())
                .then((deposit) => {
                    
                    updateSaving(deposit)
                    handleAddDeposits(deposit)
                })
                
        setOpen(false)
    }

    function updateSaving(deposit){
        const updateCurrentAmount = deposit.amount + deposit.saving.amount
        fetch(`http://localhost:3000/saving/${deposit.saving.id}`, {
                method: "PATCH",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({amount: updateCurrentAmount}),
                })
                .then((r) => r.json())
                .then((updateSaving) => {
                    updateSavingsTotal(updateSaving)
                    
                    })
                    
    }
    
        const retiermentFilter = savings.filter((saving)=> saving.saving_type === "Retirement")
        const retierment = retiermentFilter.map((saving)=>{
            return(
                <SavingRow
                    key={saving.id}
                    saving ={saving}
                />
            )
        })

        const otherFilter = savings.filter((saving)=> saving.saving_type === "Other")
        const other = otherFilter.map((saving)=>{
            return(
                <SavingRow
                    key={saving.id}
                    saving ={saving}
                />
            )
        })

    return(
        <Container>
            <Header as='h2' attached='top' textAlign='center'>
                Savings
            </Header>
            <Grid celled>
                <Grid.Column width={10}>
                    <h3>Emergancy Fund</h3>
                    <hr/>
                    <br/>
                    <br/>
                    <Grid columns={3} divided>
                        <Grid.Row>
                            <Grid.Column>
                                <p>Current Total</p>
                                <p>${totalEmergancySavings.toFixed(2)}</p>
                            </Grid.Column>
                            <Grid.Column>
                                <p>Goal</p>
                                <p>${totalOutgoing.toFixed(2)}</p>
                            </Grid.Column>
                            <Grid.Column>
                                <p>Left To Save</p>
                                <p>${leftTillGoal.toFixed(2)}</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <br/>
                    <br/>
                    <Grid columns={2} divided>
                        <Grid.Row>
                            <Grid.Column style={{"text-align": "center"}}>
                                { leftTillGoal > 0 ?
                                <p>Keep adding to your Emergancy fund. Having one Month worth of Emergancy fund while your paying off your Debit will give you some peace of mind ! </p>
                                :
                                <p>Congratulations! <br/>you have reached your Current Savings Goals! Now it's time to focus on paying down of your Debt. We will revisit Saving when all of your Debt is gone.</p>}
                            <Button inverted color='green' floated='right' size='mini' onClick={()=>setOpen(true)}>
                                    Add To Emergancy Fund
                                </Button>
                                <Modal
                                    onClose={() => setOpen(false)}
                                    onOpen={() => setOpen(true)}
                                    open={open}
                                    >
                                    <Modal.Header>Add To Emergancy Fund</Modal.Header>
                                    <Modal.Content >
                                        
                                        <Modal.Description>
                                        
                                        {/* <Form onSubmit={(e)=>{handleTransactionSubmit(e)}}> */}
                                        <Form onSubmit={(e)=>handleDepositSubmit(e)}>  
                                        <Form.Field label='Savings Account Name' control='select' name='saving_id' onChange={(e)=>handleDepositSelect(e)} >
                                            <option ></option>
                                            {depositNameOptions}
                                        </Form.Field>  
                                            <Form.Input fluid label='Amount' name='amount' value={depositForm.amount} onChange={(e)=>handleDepositChange(e)} />
                                            <Form.Input fluid label='Pay Day YYYY/MM/DD' name='deposit_date' value={depositForm.deposit_date} onChange={(e)=>handleDepositChange(e)} />
                                            
                                        </Form>
                                        </Modal.Description>
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button color='black' onClick={() => setOpen(false)}>
                                        Cancel
                                        </Button>
                                        <Button color='green' onClick={(e)=>handleDepositSubmit(e)}>Submit</Button>
                                    </Modal.Actions>
                                    </Modal>
                            </Grid.Column>
                            <Grid.Column>
                                <p>Savings Progress</p>
                                <div style={{height:"120px", 'padding-top': '20%'}}>
                                <Progress percent={percenageToGoal.toFixed()} size='small' color='green' progress />
                                    
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
                <Grid.Column width={6}>
                    <h4>Other Investments</h4>
                    <Grid.Row>
                    <Table basic>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Amount</Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>

                        <Table.Body>
                        {retierment}
                        </Table.Body>
                    </Table>
                    </Grid.Row>
                    <Grid.Row>
                    <Table >
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Amount</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {other}
                        </Table.Body>
                    </Table>
                    </Grid.Row>
                    <br/>
                    <Button inverted color='green' floated='right' size='mini'>
                        Add investment
                    </Button>
                    <Button inverted color='green' floated='left' size='mini'>
                        Edit investment
                    </Button>
                </Grid.Column>
            </Grid>
           
        </Container>    
    )
}
export default Savings