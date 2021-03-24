import { useState } from 'react'
import { Table, Form, Modal, Icon, Button, Header } from 'semantic-ui-react'

function BudgetRow({bill, updateOutgoing, deleteIcon, handleDeleteUpdated}){
    const [actualOutgoing, setActualOutgoing] = useState("")
    const [open, setOpen] = useState(false)
    const {
        outgoing,
        actual,
        paid_date,
    } = bill

    function handleActualOutgoing(e){
        setActualOutgoing(e.target.value)
    }
    function handleOutgoingUpdate(e) {
        e.preventDefault()
        fetch(`http://localhost:3000/bill/${bill.id}`, {
                method: "PATCH",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({actual: actualOutgoing}),
                })
                .then((r) => r.json())
                .then((bill) => {
                    updateOutgoing(bill)})
        
    }

    function handleDelete() {
        fetch(`http://localhost:3000/outgoing/${outgoing.id}`, 
        { method: "DELETE" })
        .then((response) => response.json())
        .then((outgoing) => handleDeleteUpdated(outgoing))
        setOpen(false)
        
    }
    
console.log(actualOutgoing)

    return(
        <Table.Row>
            {deleteIcon ?
                <Table.Cell><Icon name='trash alternate outline' onClick={()=>setOpen(true)} /></Table.Cell>
            : null}
            <Modal
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        >
                        
                        <Modal.Content >
                            
                            <Modal.Description>
                            <Header>Are you sure you want to Delete!</Header>
                            
                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='black' onClick={() => setOpen(false)}>
                            Cancel
                            </Button>
                            <Button color='green' onClick={() => handleDelete()}>
                            Delete
                            </Button>
                            
                        </Modal.Actions>
                        </Modal>
            <Table.Cell>{outgoing.name}</Table.Cell>
            <Table.Cell>${outgoing.projected}</Table.Cell>
            <Table.Cell>{actual ? `$${actual}` : 
                    <Form onSubmit={(e)=>{handleOutgoingUpdate(e)}}>
                        <Form.Input fluid  name='actual' value={actualOutgoing} onChange={(e)=>handleActualOutgoing(e)} />
                    </Form>
                    }</Table.Cell>
            <Table.Cell>{paid_date}</Table.Cell>
        </Table.Row>
    )
}
export default BudgetRow