import { useContext, useEffect } from "react"
import { CountContext } from "./CreationContext"

export const DisplayCounter = ()=>{
    const {Count}=useContext(CountContext);

    return(
        <div className="box">
            <h3>Component A (DisplayCouter)</h3>
            <p>Current Counter: <strong>{Count}</strong></p>

        </div>
    )
}  



