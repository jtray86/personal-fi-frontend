import { Container, Table, Header, Grid, Rail,
    Ref,
    Segment,
    Sticky,
Button } from 'semantic-ui-react'
import BudgetRow from "./BudgetRow";
import Chart from "react-google-charts";

function Budget(){
    return(
        <Container>
            <Grid>
                <Grid.Column width={6}>
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
                    <Button inverted color='green' floated='right' size='mini'>
                                    Debt Page
                                </Button>

                </Grid.Column>
                <Grid.Column floated='center' width= {5}>
                    <Header style={{"text-align": "center"}}>
                        The Gap
                    </Header>

                </Grid.Column>
                <Grid.Column floated='right' width= {5}>
                    <Header style={{"text-align": "center"}}>
                        Pie Chart
                    </Header>
                        <Chart
                            width={'300px'}
                            height={'300px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Task', 'Hours per Day'],
                                ['Work', 11],
                                ['Eat', 2],
                                ['Commute', 2],
                                ['Watch TV', 2],
                                ['Sleep', 7],
                            ]}
                            options={{
                                title: 'My Daily Activities',
                            }}
                            rootProps={{ 'data-testid': '1' }}
                            />
                    
                    <Button inverted color='green' floated='right' centered size='mini'>
                        Debt Page
                    </Button>
                </Grid.Column>
            </Grid>
            <Table celled>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>Notes</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                <Table.Row style={{"background-color": "#f5f5f5"}}>
                    <Table.Cell>Under $1000</Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                </Table.Row>
                <BudgetRow/>
                <Table.Row style={{"background-color": "#f5f5f5"}}>
                    <Table.Cell>Credit Card</Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                </Table.Row>
                <BudgetRow/>
                <Table.Row style={{"background-color": "#f5f5f5"}}>
                    <Table.Cell>Student Loans</Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                </Table.Row>
                <BudgetRow/>
                <Table.Row style={{"background-color": "#f5f5f5"}}>
                    <Table.Cell>John</Table.Cell>
                    <Table.Cell>Approved</Table.Cell>
                    <Table.Cell>None</Table.Cell>
                </Table.Row>
                <BudgetRow/>
                <Table.Row style={{"background-color": "#f5f5f5"}}>
                    <Table.Cell>John</Table.Cell>
                    <Table.Cell>Approved</Table.Cell>
                    <Table.Cell>None</Table.Cell>
                </Table.Row>
                <BudgetRow/>
                </Table.Body>
            </Table>
            
        </Container>
        
    )
}
export default Budget