import { Table, Icon, Modal, Button, Header, Form } from 'semantic-ui-react'
import {useState} from 'react'
import {  useHistory } from "react-router-dom";

function DebtRow({debt, payIcon, removePaymentBtn, currentUser, updateDebts}){
    const [open, setOpen] = useState(false)
    const history = useHistory();
    const{
        name,
        inital_amount,
        current_amount,
        interest,
        in_collection
    } = debt

    const [transactionForm, setTransactionForm] = useState({
        user_id: currentUser.id,
        debt_id: debt.id,
        transaction_date: '',
        amount: ''
    })

    function handleTransaction(e) {
        const name = e.target.name;
        let value = e.target.value;
        setTransactionForm({
            ...transactionForm,
            [name]: value,
        })
    }

    console.log(transactionForm)

    function handleTransactionSubmit(e) {
        e.preventDefault()
        fetch(`http://localhost:3000/transaction/${currentUser.id}`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(transactionForm),
                })
                .then((r) => r.json())
                .then((newTransaction) => {
                    updateDebt(newTransaction.amount)
                    console.log(newTransaction)
                    
                })
                
        setOpen(false)
    }

    function updateDebt(paymentAmount){
        const updateCurrentAmount= current_amount - paymentAmount
        fetch(`http://localhost:3000/debt/${debt.id}`, {
                method: "PATCH",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({current_amount: updateCurrentAmount}),
                })
                .then((r) => r.json())
                .then((Debt) => {
                    updateDebts(Debt)
                    })
    }

    return(
        <Table.Row>
                    <Table.Cell>{name}</Table.Cell>
                    <Table.Cell>${inital_amount}</Table.Cell>
                    <Table.Cell>${current_amount}</Table.Cell>
                    <Table.Cell>{interest}%</Table.Cell>
                    <Table.Cell>{in_collection ? "Yes" : "No"}</Table.Cell>
                    {payIcon ?
                    <Table.Cell><Icon name='money bill alternate outline' onClick={()=>setOpen(true)} /></Table.Cell>
                    : null}
                    <Modal
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        >
                        <Modal.Header>Select a Photo</Modal.Header>
                        <Modal.Content >
                            
                            <Modal.Description>
                            <Header>Default Profile Image</Header>
                            {/* <Form onSubmit={(e)=>{handleTransactionSubmit(e)}}> */}
                            <Form onSubmit={(e)=>handleTransactionSubmit(e)}>    
                                <Form.Input fluid label='Amount' name='amount' value={transactionForm.amount} onChange={(e)=>handleTransaction(e)} />
                                <Form.Input fluid label='Pay Day YYYY/MM/DD' name='transaction_date' value={transactionForm.transaction_date} onChange={(e)=>handleTransaction(e)} />
                                
                            </Form>
                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='black' onClick={() => setOpen(false)}>
                            Cancel
                            </Button>
                            <Button color='green' onClick={(e)=>handleTransactionSubmit(e)}>Submit</Button>
                        </Modal.Actions>
                        </Modal>
                        
        </Table.Row>
    )
}
export default DebtRow