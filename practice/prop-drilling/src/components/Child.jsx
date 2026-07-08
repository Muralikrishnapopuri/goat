import GrandChild  from './GrandChild.jsx';

const Child = ({theme})=>{
    return (
        <>
        <h1>Child</h1>
     
        <GrandChild theme={theme}/>
        </>
    )
}
export default Child;