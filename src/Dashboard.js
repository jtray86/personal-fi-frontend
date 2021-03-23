import { useParams, useHistory } from "react-router-dom";
import { Container } from 'semantic-ui-react'
import { Header, Grid, Button, Progress, Segment } from 'semantic-ui-react'
import Chart from "react-google-charts";


function Dashboard({debts, currentUser, deposits, setTotal, bills, setTotalEmergancy, savings}){
    const history = useHistory();
    const params = useParams();
    const id = params.id;

    console.log(deposits)


    const allOutgoingTotals = bills.map((bill)=> {return(bill.outgoing.projected)})
    let currentOutgoingTotal = allOutgoingTotals.reduce((result, num) =>result+num)
    setTotal(currentOutgoingTotal)
    
    const debt_amounts = debts.map((debt) => debt.inital_amount)
    const inital_debt= debt_amounts.reduce((result, num) =>result+num)
        
    const debt_current_amounts = debts.map((debt) => debt.current_amount)
    const current_debt= debt_current_amounts.reduce((result, num) =>result+num)

    const debt_dif = inital_debt - current_debt
    const percentage_payed = (debt_dif/inital_debt)*100
    
    const emergancyFundFilter = savings.filter((saving)=> saving.saving_type === "Emergancy Savings")
    
    
    // const allIncomeSavings = earnings.map((earning) =>earning.income.name) 
    // const uniqIncomeNames = allIncomeNames.filter((name, idx)=> allIncomeNames.indexOf(name) === idx)
    
    const emergancy_savings_amounts = emergancyFundFilter.map((saving) => saving.amount)
    console.log(emergancy_savings_amounts)
    const TotalEmSaving= emergancy_savings_amounts.reduce((result, num) =>result+num)
    console.log(TotalEmSaving)
    setTotalEmergancy(TotalEmSaving)
    
    return(
    <Container>
            <Header as='h2' attached='top' textAlign='center'>
                Dashboard
            </Header>
            <Grid celled >
                <Grid.Column floated='left' width={11}>
                    <Grid >
                    <Grid.Row>
                        <Grid.Column style={{"border-bottom": "solid .5px lightgray", 'padding-bottom': "7px"}} >
                            <Segment floated='right' style={{width: "75%", "margin-top": "25px"}} >
                                <Header>Progress</Header>
                                <Progress percent={percentage_payed.toFixed()} size='small' color='green' progress />
                            </Segment>
                            <h4>Total Inital Debt</h4>
                                <p>${inital_debt}</p>
                            <h4>Total Current Debt</h4>
                                <p>${current_debt}</p>
                            <Button inverted color='green' floated='right' size='mini' onClick={()=> history.push(`/debt/${currentUser.id}`)}>
                                    Debt Page
                                </Button>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                    
                        <Grid.Column style={{"border-right": "solid .5px lightgray"}} width={10}>
                            <h4>Total Emergancy Fund Savings</h4>
                            <p>${TotalEmSaving}</p>
                            <h4>Emergancy Fund Goal</h4>
                            <p>$ {currentOutgoingTotal}</p>
                            <Button inverted color='green' floated='right' size='mini' onClick={()=> history.push(`/savings/${currentUser.id}`)}>
                                Savings Page
                            </Button>
                        </Grid.Column>
                        <Grid.Column floated='right' width={6} style={{"text-align": "center"}}>
                            Advice
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                </Grid.Column>
                <Grid.Column floated='right' style={{margin: 0}} width={5} style={{"text-align": "center"}}>
                    <h4 style={{'margin-bottom':'0px'}} >Budget</h4>
                    <Chart
                            width={'100%'}
                            height={'200px'}
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
                            <h4 sytle={{'margin-top': '0px'}}>The Gap</h4>
                            <p>$</p>
                            <div style={{display: "inline-flex", "padding-bottom": "6px"}}>
                                <div style={{"padding-right": "4px"}}>
                                    <p>Projected Income</p>
                                    <p>$</p>
                                </div>
                                <div style={{"padding-left": "4px", "border-left":"solid .2px lightgray"}}>
                                    <p >Projected Outgoing</p>
                                    <p>$</p>
                                </div>
                            </div>
                            <Button inverted color='green' onClick={()=> history.push(`/budget/${currentUser.id}`)}>
                                Budget
                            </Button>
                </Grid.Column>
            </Grid>
        
    </Container>
    )
}
export default Dashboard
