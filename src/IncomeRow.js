import { Table } from 'semantic-ui-react'

function IncomeRow({earning}){
    const{
        income,
        actual,
        pay_day
    } = earning
    
    return(
        <Table.Row>
                    <Table.Cell>{income.name}</Table.Cell>
                    <Table.Cell>{income.projected}</Table.Cell>
                    <Table.Cell>{actual}</Table.Cell>
                    <Table.Cell>{pay_day}</Table.Cell>
                    
        </Table.Row>
    )
}
export default IncomeRow