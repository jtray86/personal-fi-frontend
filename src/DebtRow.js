import { Table } from 'semantic-ui-react'

function DebtRow({debt}){
    const{
        name,
        inital_amount,
        current_amount,
        interest,
        in_collection
    } = debt

    return(
        <Table.Row>
                    <Table.Cell>{name}</Table.Cell>
                    <Table.Cell>{inital_amount}</Table.Cell>
                    <Table.Cell>{current_amount}</Table.Cell>
                    <Table.Cell>{interest}</Table.Cell>
                    <Table.Cell>{in_collection ? "Yes" : "No"}</Table.Cell>
        </Table.Row>
    )
}
export default DebtRow