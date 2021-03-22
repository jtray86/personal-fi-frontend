import { Container, Header, Grid, Button, Table, Progress } from 'semantic-ui-react'


function Savings({totalOutgoing, deposits, totalEmergancySavings}){
    
    const emergancyFundFilter = deposits.filter((deposit)=> deposit.saving.saving_type === "Emergancy Savings")
    
    

    const leftTillGoal = totalOutgoing - totalEmergancySavings
    return(
        <Container>
            <Header as='h2' attached='top' textAlign='center'>
                Savings
            </Header>
            <Grid celled>
                <Grid.Column width={10}>
                    <h3>Emergancy Fund</h3>
                    <hr/>
                    <br/>
                    <br/>
                    <Grid columns={3} divided>
                        <Grid.Row>
                            <Grid.Column>
                                <p>Current Total</p>
                                <p>${totalEmergancySavings}</p>
                            </Grid.Column>
                            <Grid.Column>
                                <p>Goal</p>
                                <p>${totalOutgoing}</p>
                            </Grid.Column>
                            <Grid.Column>
                                <p>Left To Save</p>
                                <p>${leftTillGoal}</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <br/>
                    <br/>
                    <Grid columns={2} divided>
                        <Grid.Row>
                            <Grid.Column style={{"text-align": "center"}}>
                                { leftTillGoal > 0 ?
                                <p>Keep adding to your Emergancy fund. Having one Month worth of Emergancy fund while your paying off your Debit will give you some peace of mind ! </p>
                                :
                                <p>Congratulations! <br/>you have reached your Current Savings Goals! Now it's time to focus on paying down of your Debt. We will revisit Saving when all of your Debt is gone.</p>}
                            <Button inverted color='green' floated='right' size='mini'>
                                    Add To Emergancy Fund
                                </Button>
                            </Grid.Column>
                            <Grid.Column>
                                <p>Savings Progress</p>
                                <div style={{height:"120px", 'padding-top': '20%'}}>
                                <Progress percent={10} size='small' color='green' progress />
                                    
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
                <Grid.Column width={6}>
                    <h4>Other Investments</h4>
                    <Grid.Row>
                    <Table basic>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Notes</Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>

                        <Table.Body>
                        <Table.Row>
                            <Table.Cell>John</Table.Cell>
                            <Table.Cell>Approved</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                        </Table.Row>
                        </Table.Body>
                    </Table>
                    </Grid.Row>
                    <Grid.Row>
                    <Table >
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row >
                                <Table.Cell>Under $1000</Table.Cell>
                                <Table.Cell>stuff</Table.Cell>
                                
                            </Table.Row>
                        </Table.Body>
                    </Table>
                    </Grid.Row>
                    <br/>
                    <Button inverted color='green' floated='right' size='mini'>
                        Add investment
                    </Button>
                    <Button inverted color='green' floated='left' size='mini'>
                        Edit investment
                    </Button>
                </Grid.Column>
            </Grid>
           
        </Container>    
    )
}
export default Savings