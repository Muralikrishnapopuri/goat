import { useParams } from "react-router-dom"

function User(){
    const id = useParams();
    return(
        <>
            <div style={{height:"100vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",background:"black",color:"white"}}>

<h1>User component here with id : {id}</h1>
    </div>
        </>
    )
}
export default User;