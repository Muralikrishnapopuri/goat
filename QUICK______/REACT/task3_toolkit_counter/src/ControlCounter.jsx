import { useDispatch } from "react-redux"
import { addByAmount, decre, incre } from "./CounterSlice";

export const ControlCounter = ()=>{
    const dispatch = useDispatch();
    return(
        <div>
            <h3>--Component control --</h3>
            <div>
                <button style={{background:"blue"}} onClick={()=>dispatch(incre())}>+ Incre</button>
                <button style={{background:"red"}}  onClick={()=>dispatch(decre())}>- Decre</button>
                <button style={{background:"green"}} onClick={()=>dispatch(addByAmount(5))}>Add 5</button>


            </div>

        </div>
    )
}

