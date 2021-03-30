import img3 from "./3.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import { Container } from 'semantic-ui-react'

function Home(){
    return(
        <Container textAlign= "center">
            <img src={img1} atl="MyFI" style={{height: "25rem"}}/>
            <img src={img2} atl="MyFI" style={{height: "25rem"}}/>
            <img src={img3} atl="MyFI" style={{height: "25rem"}}/>
        </Container>
    )
}
export default Home