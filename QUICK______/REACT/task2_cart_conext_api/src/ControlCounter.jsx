import { useContext } from "react"
import { CountContext } from "./CreationContext";

export const ControlCounter = ()=>{
    const {setCount}=useContext(CountContext);
    return(
        <div className="box">
            <h3>Component B (ControlCounter)</h3>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"5px"}}>
           <button style={{background:"green",color:"white",padding:"10px 30px" , borderRadius:"6px"}} onClick={()=>setCount((prev)=>prev+1)}>+ Incre</button>
           <button style={{background:"red",color:"white",padding:"10px 30px" , borderRadius:"6px"}} onClick={()=>setCount((prev)=>prev-1)}>-</button>
           <button style={{background:"white",color:"black",padding:"10px 30px" ,border:"2px solid yellow", borderRadius:"6px"}} onClick={()=>setCount(0)}>Reset</button>
       </div>
        </div>
    )
}