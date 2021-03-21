import { useState } from 'react'
import { Table, Form } from 'semantic-ui-react'

function BudgetRow({bill, updateOutgoing}){
    const [actualOutgoing, setActualOutgoing] = useState("")
    const {
        outgoing,
        actual,
        paid_date,
    } = bill

    function handleActualOutgoing(e){
        setActualOutgoing((actualOutgoing)=>e.target.value)
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
    
console.log(actualOutgoing)

    return(
        <Table.Row>
            <Table.Cell>{outgoing.name}</Table.Cell>
            <Table.Cell>{outgoing.projected}</Table.Cell>
            <Table.Cell>{actual ? actual : 
                    <Form onSubmit={(e)=>{handleOutgoingUpdate(e)}}>
                        <Form.Input fluid  name='actual' value={actualOutgoing} onChange={(e)=>handleActualOutgoing(e)} />
                    </Form>
                    }</Table.Cell>
            <Table.Cell>{paid_date}</Table.Cell>
        </Table.Row>
    )
}
export default BudgetRow