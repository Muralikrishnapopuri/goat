import Child from './Child.jsx';

const Parent = ({value})=>{
    return(
        <>
<h1>Parent</h1>

<Child theme={value.theme}/>

     </>
    )
}
export default Parent;