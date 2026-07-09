import { useParams } from "react-router-dom";

function Blog(){
    const name = useParams();
return(
    <>
    <div style={{height:"100vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",background:"black",color:"white"}}>

<h1>Blog component here with : {name}</h1>
    </div>
    </>
)
}
export default Blog;