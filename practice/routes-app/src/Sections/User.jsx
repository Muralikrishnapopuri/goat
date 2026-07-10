import { useParams , useNavigate} from "react-router-dom"

function User(){
    const no = useParams();
    const naviagte = useNavigate();
    return(
        <>
            <div style={{height:"100vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",background:"black",color:"white"}}>

<h1>User component here with id : {no.no}</h1>
 <button style={{background:"white",color:"black",fontWeight:"bold"}} onClick={()=>{naviagte("/")}}>Go to Home</button>
    </div>
   
        </>
    )
}
export default User;