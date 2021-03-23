import { useState } from 'react'
import { Table, Form } from 'semantic-ui-react'

function IncomeRow({earning, updateEarning}){
    const [actualIncome, setActualIncome] = useState("")
    const{
        income,
        actual,
        pay_day
    } = earning

    function handleActualIncome(e){
        setActualIncome((actualIncome)=>e.target.value)
    }
    function handleEarningUpdate(e) {
        e.preventDefault()
        fetch(`http://localhost:3000/earning/${earning.id}`, {
                method: "PATCH",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({actual: actualIncome}),
                })
                .then((r) => r.json())
                .then((earning) => {
                    updateEarning(earning)})
        
    }
    
console.log(actualIncome)

    return(
        <Table.Row>
                    <Table.Cell>{income.name}</Table.Cell>
                    <Table.Cell>${income.projected}</Table.Cell>
                    <Table.Cell>{actual ?  `$${actual}` : 
                    <Form onSubmit={(e)=>{handleEarningUpdate(e)}}>
                        <Form.Input fluid  name='actual' value={actualIncome} onChange={(e)=>handleActualIncome(e)} />
                    </Form>
                    }</Table.Cell>
                    <Table.Cell>{pay_day}</Table.Cell>
                    
        </Table.Row>
    )
}
export default IncomeRow