import { Table } from 'semantic-ui-react'

function BudgetRow({bill}){
    
    const {
        outgoing,
        actual,
        paid_date,
    } = bill
    return(
        <Table.Row>
            <Table.Cell>{outgoing.name}</Table.Cell>
            <Table.Cell>{outgoing.projected}</Table.Cell>
            <Table.Cell>{actual}</Table.Cell>
            <Table.Cell>{paid_date}</Table.Cell>
        </Table.Row>
    )
}
export default BudgetRow