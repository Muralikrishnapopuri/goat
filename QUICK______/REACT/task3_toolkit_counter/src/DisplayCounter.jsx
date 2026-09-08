import { useSelector} from 'react-redux';

export const DisplayCounter = ()=>{


    const count = useSelector((state)=> state.count.value);
 
 
    return(
        <div className='box'>
            <h3>Redux State (Display)</h3>
            <p>Counter: <strong>{count}</strong></p>
        </div>
    )
};

