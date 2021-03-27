import { useState } from 'react'
import { Table, Form, Modal, Icon, Button, Header } from 'semantic-ui-react'

function BudgetRow({bill, updateOutgoing, deleteIcon, handleDeleteUpdated, editIcon, updateEditedOutgoing}){
    const [actualOutgoing, setActualOutgoing] = useState("")
    const [open, setOpen] = useState(false)
    const [EditBillOpen, setEditBillOpen] = useState(false)
    const {
        outgoing,
        actual,
        paid_date,
    } = bill
    const [editOutgoingForm, SetEditOutgoingForm] =useState({
        name: `${outgoing.name}`, 
    projected: `${outgoing.projected}`,
    due_date: `${outgoing.due_date}`
    })
    
    

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
    function handleOutgoingEditForm(e) {
        
        const name = e.target.name;
        let value = e.target.value;
        SetEditOutgoingForm({
            ...editOutgoingForm,
            [name]: value,
        })
    }
    
function HandleEditSubmit(e){
    e.preventDefault()
    fetch(`http://localhost:3000/outgoing/${outgoing.id}`, {
                method: "PATCH",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({editOutgoingForm}),
                })
                .then((r) => r.json())
                .then((newOutgoing)=> {updateEditedOutgoing(newOutgoing)
                fetchBillInst()})
                
    setEditBillOpen(false)

}

function fetchBillInst(){
    fetch(`http://localhost:3000/bill/show/${bill.id}`)
    .then((r) => r.json())
    .then((updatedBill)=>updateOutgoing(updatedBill))
}

    return(
        <Table.Row>
            {deleteIcon ?
                <Table.Cell><Icon name='trash alternate outline' onClick={()=>setOpen(true)} /></Table.Cell>
            : null}
            {editIcon ?
                <Table.Cell><Icon name='edit outline icon' onClick={()=>setEditBillOpen(true)}/></Table.Cell>
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
            <Modal
                        onClose={() => setEditBillOpen(false)}
                        onOpen={() => setEditBillOpen(true)}
                        open={EditBillOpen}
                        >
                        
                        <Modal.Content >
                        
                            <Modal.Description>
                            <Header>Edit {outgoing.name}</Header>
                            <Form onSubmit={(e)=> {HandleEditSubmit(e)}}>
                                <Form.Input fluid label="Name" name='name' value={editOutgoingForm.name} onChange={(e) => handleOutgoingEditForm(e)}/>
                                <Form.Input fluid label= "Projected Amount" name='projected' value={editOutgoingForm.projected} onChange={(e) => handleOutgoingEditForm(e)}/>
                                <Form.Input fluid label= 'Due date' name='due_date' value={editOutgoingForm.due_date} onChange={(e) => handleOutgoingEditForm(e)}/>
                                </Form>
                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='black' onClick={() => setEditBillOpen(false)}>
                                Cancel
                            </Button>
                            <Button color='green' floated="right" type="submit" onClick={(e)=> {HandleEditSubmit(e)}}>
                                Edit
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
            <Table.Cell>{outgoing.due_date}</Table.Cell>
        </Table.Row>
    )
}
export default BudgetRow