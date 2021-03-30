import { Header, Table, Container, Grid, Button, Progress, Segment, Modal, Form } from 'semantic-ui-react'
import { useParams, useHistory } from "react-router-dom";
import DebtRow from "./DebtRow";
import { useState } from 'react'


function Debt({debts, currentUser, transactions, updateDebts, addNewTransactionToState, addNewDebtToState}){
    const [payIcon, setPayIcon] = useState(false)
    const [addDebtMod, setAddDebtMod] = useState(false)
    const [addNewDebtForm, setAddNewDebtForm] = useState({
        debt_type: "",
        name: "",
        inital_amount: "",
        current_amount: "",
        interest: "",
        in_collection: ""
    })
    const history = useHistory();

    const debt_amounts = debts.map((debt) => debt.inital_amount)
    const inital_debt= debt_amounts.reduce((result, num) =>result+num)

    const debt_current_amounts = debts.map((debt) => debt.current_amount)
    const current_debt= debt_current_amounts.reduce((result, num) =>result+num)

    const debt_dif = inital_debt - current_debt
    const percentage_payed = (debt_dif/inital_debt)*100

    const under_thousand = debts.filter((debt) => debt.current_amount < 1000 && debt.current_amount !== 0)

    const debt_row_under = under_thousand.map((debt) =>
    {
      
        return(
            <DebtRow
            key={debt.id}
            debt={debt}
            payIcon={payIcon}
            removePaymentBtn={removePaymentBtn}
            currentUser={currentUser}
            updateDebts={updateDebts}
            />
        )
    }
    )

    const larger_debts = debts.filter((debt) => debt.current_amount > 1000 )

    const debt_row = larger_debts.map((debt) =>
    {
        return(
            <DebtRow
            key={debt.id}
            debt={debt}
            payIcon={payIcon}
            removePaymentBtn={removePaymentBtn}
            currentUser={currentUser}
            updateDebts={updateDebts}
            />
        )
    }
    )

    const paid_off = debts.filter((debt) => debt.current_amount === 0)

    const paid_row = paid_off.map((debt) =>
    {
        return(
            <DebtRow
            key={debt.id}
            debt={debt}
            currentUser={currentUser}
            />
        )
    }
    )

    function removePaymentBtn(){
        setPayIcon(false)
    }

    function handleNewDebt(e) {
        const name = e.target.name;
        let value = e.target.value;
        setAddNewDebtForm({
            ...addNewDebtForm,
            [name]: value,
    })
    }

    console.log(addNewDebtForm)
    function handleNewDebtClose() {
        setAddDebtMod(false)
        setAddNewDebtForm({
            debt_type: "",
            name: "",
            inital_amount: "",
            current_amount: "",
            interest: "",
            in_collection: ""
        })
    }

    function handleNewDebtSubmit(e) {
        e.preventDefault()
        
        fetch("http://localhost:3000/newDebt", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(addNewDebtForm),
                })
                .then((r) => r.json())
                .then((newDebtInst) => {

                    addNewTransaction(newDebtInst);
                    addNewDebtToState(newDebtInst)})
                    handleNewDebtClose()
    }

    function addNewTransaction(newDebtInst) {
        const newTransaction= {
                user_id: currentUser.id,
                debt_id: newDebtInst.id,
                transaction_date: "" 
            }
        fetch("http://localhost:3000/transaction", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(newTransaction),
                })
                .then((r) => r.json())
                .then((newTransactionInst) => {
                    addNewTransactionToState(newTransactionInst)})
                    
        }
    

    return(
        
        <Container style = {{background: "white", padding: "2rem"}}>
            <Header as='h2' attached='top' textAlign='center'>
                Debit
            </Header>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={11}>
                    <br/>
            <Header>Debts Under $1000</Header>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Inital Amount</Table.HeaderCell>
                        <Table.HeaderCell>Current Amount</Table.HeaderCell>
                        <Table.HeaderCell>Interest</Table.HeaderCell>
                        <Table.HeaderCell>In Collections</Table.HeaderCell>
                        {payIcon ? <Table.HeaderCell>Report a Payment</Table.HeaderCell> : null}
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    {debt_row_under}
                </Table.Body>
            </Table>
            <Header>Larger Debts</Header>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Inital Amount</Table.HeaderCell>
                        <Table.HeaderCell>Current Amount</Table.HeaderCell>
                        <Table.HeaderCell>Interest</Table.HeaderCell>
                        <Table.HeaderCell>In Collections</Table.HeaderCell>
                        {payIcon ? <Table.HeaderCell>Report a Payment</Table.HeaderCell> : null}
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {debt_row}
                </Table.Body>
            </Table>
                    </Grid.Column>
                    <Grid.Column width={5} floated='right' textAlign='center'>
                        <br/>
                        <Header textAlign='center'>Total Inital Debt</Header>
                        {/* <p>${inital_debt}</p><span>${current_debt}</span>
                        <br/>  */}
                        <div style={{display: "inline-flex", "padding-bottom": "6px", }}>
                                <div style={{"padding-right": "2rem"}}>
                                    <p>Inital Debt</p>
                                    <p>${inital_debt.toFixed(2)}</p>
                                </div>
                                <div style={{"padding-left": "1.5rem", "border-left":"solid .2px lightgray"}}>
                                    <p >Current Debt</p>
                                    <p>${current_debt.toFixed(2)}</p>
                                </div>
                            </div>
                        <Segment>
                            <Progress percent={percentage_payed.toFixed()} size='small' color='green' progress >
                                Paid off
                            </Progress>
                        </Segment>
                        <Button inverted color='green' floated='right' size='mini' onClick={()=>setPayIcon(!payIcon)} >
                            Report A Payment
                        </Button>
                        <Button inverted color='green' floated='right' size='mini' onClick={()=>setAddDebtMod(true)} >
                            Add a Debt
                        </Button>
                        <Modal
                        onClose={() => setAddDebtMod(false)}
                        onOpen={() => setAddDebtMod(true)}
                        open={addDebtMod}
                        >
                        <Modal.Header>New Debt</Modal.Header>
                        <Modal.Content >
                            
                            <Modal.Description>
                            <Form onSubmit={(e)=>handleNewDebtSubmit(e)}>
                            <Form.Field label='Select Debt Type' control='select' name='debt_type' onChange={(e)=>handleNewDebt(e)} >
                                        <option ></option>
                                        <option name="debt_type" value='Credit Card'>Credit Card</option> 
                                        <option name="debt_type" value='Auto Loan'>Auto Loan</option>
                                        <option name="debt_type" value='Student Loan'>Student Loan</option>
                                        <option name="debt_type" value='Personal Loan'>Personal Loan</option>
                                        <option name="debt_type" value='Medical'>Medical</option>
                                        <option name="debt_type" value='Payday Loan'>Payday Loan</option>
                                        <option name="debt_type" value='Miscellaneous'>Miscellaneous</option>
                                </Form.Field>  
                                <Form.Input fluid label='Name of Account' name='name' value={addNewDebtForm.name} onChange={(e)=>handleNewDebt(e)} />  
                                <Form.Input fluid label='Inital Amount' name='inital_amount' value={addNewDebtForm.inital_amount} onChange={(e)=>handleNewDebt(e)} />
                                <Form.Input fluid label='Current Amount' name='current_amount' value={addNewDebtForm.current_amount} onChange={(e)=>handleNewDebt(e)} />
                                <Form.Input fluid label='Interset' name='interest' value={addNewDebtForm.interest} onChange={(e)=>handleNewDebt(e)} />
                                <Form.Field label='Is This Debt in Collections' control='select' name='in_collection' onChange={(e)=>handleNewDebt(e)} >
                                        <option ></option>
                                        <option name="in_collection" value='True'>Yes</option> 
                                        <option name="in_collection" value='False'>No</option>
                                </Form.Field>  
                            </Form>
                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='black' onClick={() => handleNewDebtClose()}>
                            Cancel
                            </Button>
                            <Button color='green' onClick={(e)=>handleNewDebtSubmit(e)}>Submit</Button>
                        </Modal.Actions>
                        </Modal>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={7}>
                        <p>Paid Off</p>
                        <Table celled>
                            <Table.Header>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Inital Amount</Table.HeaderCell>
                                <Table.HeaderCell>Current Amount</Table.HeaderCell>
                                <Table.HeaderCell>Interest</Table.HeaderCell>
                                <Table.HeaderCell>In Collections</Table.HeaderCell>
                            </Table.Header>
                            <Table.Body>
                            {paid_row}
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                    <Grid.Column width={9}>
                        
                    
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <div style={{height: '2rem'}}></div>
        </Container>
        
    )
}
export default Debt