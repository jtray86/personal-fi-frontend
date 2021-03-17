import { useParams } from "react-router-dom";

function Dashboard(){
    const params = useParams();
    const id = params.id;
    
    return(
    <div>
        Dashboard
    </div>
    )
}
export default Dashboard
