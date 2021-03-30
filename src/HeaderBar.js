import { Header } from 'semantic-ui-react'
import { Button, Modal, Form, Checkbox, Menu, Segment } from 'semantic-ui-react'
import { useState, React } from "react";
import { useHistory } from "react-router-dom";
import Dashboard from './Dashboard';
import Myfi from "./MYfi.jpg";

function HeaderBar({setCurrentUser, currentUser}){
    const [open, setOpen] = useState(false)
    const [activeNavItem, setActiveNavItem] = useState("")
    const [loginForm, setLoginForm] = useState({username:"", password:""})
    const history = useHistory();
    // function handleChange(e) {
    //     setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
    // }

    function handleLogin() {
        fetch("http://localhost:3000/me")
          .then((r) => r.json())
          .then((user) => {setCurrentUser(user);
          
          history.push(`/dashboard/${user.id}`)
          setOpen(false)
        })
      }
    
      // manual logout
      function handleLogout() {
        setCurrentUser(null);
      }
    return(
        <> 
        <Header as='h1' block textAlign='center' style={{'background-color':'white', 'margin-bottom': '0'}}>
            <img src= {Myfi} atl="MYFI" style={{height:"4.5rem" , width:"auto"}}/>
            {currentUser ? <Button floated='right'  inverted color='green' size='mini' onClick={handleLogout}>Logout</Button> :
            <Button floated='right'  inverted color='green' size='mini'onClick={() => setOpen((open) =>true)}>Login</Button>}
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                
                >
                <Modal.Header>Log In</Modal.Header>
                <Modal.Content image>
                    
                    <Modal.Description>
                    <Header>Default Profile Image</Header>
                    <Form>
                        <Form.Field>
                        <label>Username</label>
                        <input name = "username" />
                        </Form.Field>
                        <Form.Field>
                        <label>Password</label>
                        <input  name = "password"/>
                        </Form.Field>
                        <Form.Field>
                        <Checkbox label='I agree to the Terms and Conditions' />
                        </Form.Field>
                        
                    </Form>
                    
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => setOpen(false)}>
                    Sign Up
                    </Button>
                    <Button
                    content="Yep, that's me"
                    onClick={handleLogin}
                    positive
                    />
                </Modal.Actions>
                </Modal>
        
        </Header>
        {currentUser ? 
        <Menu pointing secondary style = {{background: "white", 'margin-top': '0'}}>
            <Menu.Item
            name='home'
            active={activeNavItem === 'home'}
            onClick={()=> {setActiveNavItem("home"); history.push(`/`)}}
          />
          <Menu.Item
            name='dashboard'
            active={activeNavItem === 'dashboard'}
            onClick={()=> {setActiveNavItem('dashboard'); history.push(`/dashboard/${currentUser.id}`)}}
          />
          <Menu.Item
            name='budget'
            active={activeNavItem === 'budget'}
            onClick={()=> {setActiveNavItem('budget'); history.push(`/budget/${currentUser.id}`)}}
          />
          <Menu.Item
            name='savings'
            active={activeNavItem === 'savings'}
            onClick={()=> {setActiveNavItem('savings'); history.push(`/savings/${currentUser.id}`)}}
          />
          <Menu.Menu >
            <Menu.Item
              name='debt'
              active={activeNavItem === 'debt'}
              onClick={()=> {setActiveNavItem('debt'); history.push(`/debt/${currentUser.id}`)}}
            />
          </Menu.Menu>
        </Menu>
        :null}
        
        </>
    )
    }
export default HeaderBar