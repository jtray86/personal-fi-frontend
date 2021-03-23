import { useState } from 'react'
import { Table, Form } from 'semantic-ui-react'

function SavingsRow({saving}){

    return(
        <Table.Row>
                    <Table.Cell>{saving.name}</Table.Cell>
                    <Table.Cell>{saving.amount}</Table.Cell>
        </Table.Row>
    )
}

export default SavingsRow

