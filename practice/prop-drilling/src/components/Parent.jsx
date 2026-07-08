import Child from './Child.jsx';
import useCounter from './increment.js';

const Parent = ({value})=>{
    const {count , increment} = useCounter();
    return(
        <>
<h1>Parent</h1>

<Child theme={value.theme}/>

{count}
<button onClick={increment}>increment</button>
     </>
    )
}
export default Parent;