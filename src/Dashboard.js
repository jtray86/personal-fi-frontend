import { useParams, useHistory } from "react-router-dom";
import { Container } from 'semantic-ui-react'
import { Header, Grid, Button, Progress, Segment } from 'semantic-ui-react'
import Chart from "react-google-charts";
import PieChart from'./PieChart'


function Dashboard({debts, currentUser, deposits, earnings, outgoing, settingTotalOutgoing, bills, setTotalEmergancy, savings}){
    const history = useHistory();
    const params = useParams();
    const id = params.id;

    // Budget //
    const earningTotalAry = earnings.map((earning)=> earning.income.projected)
    let totalPojectedIncome = earningTotalAry.reduce((result, num) =>result+num)


    const allOutgoingTotals = outgoing.map((outgoing_inst)=> outgoing_inst.projected)
    let currentOutgoingTotal = allOutgoingTotals.reduce((result, num) =>result+num)
    settingTotalOutgoing(currentOutgoingTotal)

    const gapTotal= totalPojectedIncome - currentOutgoingTotal

    //Debit //
    const debt_amounts = debts.map((debt) => debt.inital_amount)
    const inital_debt= debt_amounts.reduce((result, num) =>result+num)
        
    const debt_current_amounts = debts.map((debt) => debt.current_amount)
    const current_debt= debt_current_amounts.reduce((result, num) =>result+num)

    const debt_dif = inital_debt - current_debt
    const percentage_payed = (debt_dif/inital_debt)*100

    // Saving //
    const emergancyFundFilter = savings.filter((saving)=> saving.saving_type === "Emergancy Savings")
    const emergancy_savings_amounts = emergancyFundFilter.map((saving) => saving.amount)
    const TotalEmSaving= emergancy_savings_amounts.reduce((result, num) =>result+num)
    
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
                            <strong>Advice</strong>
                            <hr/>
                            <br/>
                            {gapTotal < 0 ?
                                <p>Lets Focus on increasing your income and/or decreacing your spending</p>
                            :TotalEmSaving !== currentOutgoingTotal ?
                                <><p>Lets Focus on your Savings Goals. Any extra income should go to your Emergancy Fund</p>
                                <Button inverted color='green' floated='right' size='mini' onClick={()=> history.push(`/savings/${currentUser.id}`)}>
                                    Savings Page
                                </Button></>
                            :<><p>Lets Focus on getting your depits paid off</p>
                            <Button inverted color='green' floated='right' size='mini' onClick={()=> history.push(`/debt/${currentUser.id}`)}>
                                Debt Page
                            </Button></>
                            }
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                </Grid.Column>
                <Grid.Column floated='right' style={{margin: 0}} width={5} style={{"text-align": "center"}}>
                    <h4 style={{'margin-bottom':'0px'}} >Budget</h4>
                    <PieChart outgoing={outgoing}/>
                            <h4 sytle={{'margin-top': '0px'}}>The Gap</h4>
                            <p>${gapTotal.toFixed(2)}</p>
                            <div style={{display: "inline-flex", "padding-bottom": "6px"}}>
                                <div style={{"padding-right": "4px"}}>
                                    <p>Projected Income</p>
                                    <p>${totalPojectedIncome}</p>
                                </div>
                                <div style={{"padding-left": "4px", "border-left":"solid .2px lightgray"}}>
                                    <p >Projected Outgoing</p>
                                    <p>${currentOutgoingTotal}</p>
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
