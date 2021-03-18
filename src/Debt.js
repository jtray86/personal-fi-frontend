import { Header, Table, Container, Grid, Button, Progress, Segment } from 'semantic-ui-react'

function Debt(){
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
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Notes</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    <Table.Row >
                        <Table.Cell>Under $1000</Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Notes</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    <Table.Row >
                        <Table.Cell>Under $1000</Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
                    </Grid.Column>
                    <Grid.Column width={5} floated='right'>
                        <br/>
                        <Header textAlign='center'>Total Inital Debt</Header>
                        <p>$</p>
                        <br/> 
                        <Segment>
                            <Progress percent={10} size='small' color='green' progress >
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
                                <Table.Row >
                                    <Table.Cell>Under $1000</Table.Cell>
                                    <Table.Cell></Table.Cell>
                                    <Table.Cell></Table.Cell>
                                </Table.Row>
                                <Table.Row >
                                    <Table.Cell>Under $1000</Table.Cell>
                                    <Table.Cell></Table.Cell>
                                    <Table.Cell></Table.Cell>
                                </Table.Row>
                                <Table.Row >
                                    <Table.Cell>Under $1000</Table.Cell>
                                    <Table.Cell></Table.Cell>
                                    <Table.Cell></Table.Cell>
                                </Table.Row>
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