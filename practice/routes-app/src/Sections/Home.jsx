import {useNavigate} from 'react-router-dom';
function Home(){
    const navigate = useNavigate();
return(
    <>
    <div style={{height:"100vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",background:"black",color:"white"}}>

<h1>Home component here</h1>
 <button style={{background:"white",color:"black",fontWeight:"bold"}} onClick={()=>{navigate("/user/345")}}>Go to User</button>

    </div>
    </>
)
}
export default Home;