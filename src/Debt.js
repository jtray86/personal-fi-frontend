import { Header, Table, Container, Grid, Button, Progress, Segment } from 'semantic-ui-react'
import { useParams, useHistory } from "react-router-dom";
import DebtRow from "./DebtRow";


function Debt({debts, currentUser}){
    const history = useHistory();

    const debt_amounts = debts.map((debt) => debt.inital_amount)
    const inital_debt= debt_amounts.reduce((result, num) =>result+num)

    const debt_current_amounts = debts.map((debt) => debt.current_amount)
    const current_debt= debt_current_amounts.reduce((result, num) =>result+num)

    const debt_dif = inital_debt - current_debt
    const percentage_payed = debt_dif/inital_debt

    const under_thousand = debts.filter((debt) => debt.current_amount < 1000)

    const debt_row_under = under_thousand.map((debt) =>
    {
        return(
            <DebtRow
            key={debt.id}
            debt={debt}
            />
        )
    }
    )

    const larger_debts = debts.filter((debt) => debt.current_amount > 1000)

    const debt_row = larger_debts.map((debt) =>
    {
        return(
            <DebtRow
            key={debt.id}
            debt={debt}
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
            />
        )
    }
    )


    return(
        
        <Container>
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
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {debt_row}
                </Table.Body>
            </Table>
                    </Grid.Column>
                    <Grid.Column width={5} floated='right'>
                        <br/>
                        <Header textAlign='center'>Total Inital Debt</Header>
                        <p>${inital_debt}</p>
                        <br/> 
                        <Segment>
                            <Progress percent={percentage_payed.toFixed(2)} size='small' color='green' progress >
                                Paid off
                            </Progress>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={7}>
                        <p>Paid Off</p>
                        <Table celled>
                            <Table.Body>
                            {paid_row}
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                    <Grid.Column width={9}>
                        <div style={{height:"90%"}}></div>
                        <Button inverted color='green' floated='right' size='mini' >
                            Debt Page
                        </Button>
                        <Button inverted color='green' floated='right' size='mini' >
                            Debt Page
                        </Button>
                        <Button inverted color='green' floated='right' size='mini' >
                            Debt Page
                        </Button>
                    
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
        
    )
}
export default Debt