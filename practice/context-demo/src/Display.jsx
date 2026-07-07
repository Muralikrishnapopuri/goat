import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { CountContext } from "./CountContext";

const  Display = ()=>{
    const {theme} = useContext(ThemeContext);
    const {count,setCount} = useContext(CountContext);
return(
    <>
     <span> current theme : {theme}</span>

     <button onClick={()=>{
        setCount(prev=>prev+1);
     }}>increse</button>

     <div>
        <span>this is count: {count}</span>
     </div>
    </>
)
}  
export default Display;