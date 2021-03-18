import { useParams } from "react-router-dom";
import { Container } from 'semantic-ui-react'
import { Header, Grid, Button, Progress, Segment } from 'semantic-ui-react'
import Chart from "react-google-charts";

function Dashboard(){
    const params = useParams();
    const id = params.id;
    
    return(
    <Container>
            
            <Grid celled >
                <Grid.Column floated='left' width={11}>
                    <Grid >
                    <Grid.Row>
                        <Grid.Column >
                            <Segment floated='right' style={{width: "75%", "margin-top": "25px"}} >
                                <Header>Progress</Header>
                                <Progress percent={83} size='small' color='green' progress />
                            </Segment>
                            <h4>Total Inital Debt</h4>
                                <p>$</p>
                            <h4>Total Current Debt</h4>
                                <p>$</p>
                            <Button inverted color='green' floated='right' size='mini'>
                                    Debt Page
                                </Button>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                    
                        <Grid.Column color="grey" width={10}>
                            <h4>Total Emergancy Fund Savings</h4>
                            <p>$</p>
                            <h4>Emergancy Fund Goal</h4>
                            <p>$</p>
                            <Button inverted color='green' floated='right' size='mini'>
                                Savings Page
                            </Button>
                        </Grid.Column>
                        <Grid.Column floated='right' width={6} style={{"text-align": "center"}}>
                            Advice
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                </Grid.Column>
                <Grid.Column floated='right' style={{margin: 0}} width={5}>
                    <h4 style={{"text-align": "center"}}>Budget</h4>
                    <Chart
                            width={'100%'}
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
                            <Button inverted color='green'>
                                Green
                            </Button>
                </Grid.Column>
            </Grid>
        
    </Container>
    )
}
export default Dashboard
