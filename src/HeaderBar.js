import { Header } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'

function HeaderBar(){
    return(
        <Header as='h1' block textAlign='center' style={{'background-color':'#9effb8'}}>
            Personal FI
            <Button floated='right'  inverted color='green' size='mini'>Login</Button>
        </Header>
    )
    }
export default HeaderBar