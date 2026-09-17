import { useDispatch, useSelector } from "react-redux";
import { remove } from "./UserSlice";

export const DisplayUser = ()=>{
   
    const user = useSelector((state)=>state.user);
    const dispatch = useDispatch();
    return(
        <div>
            <h3>--component displayuser--</h3>
            <table>
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>No</th>
                    <th>Roll</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map((u,index)=>{
                        return(
                           
                            <tr key={index}>
                            <td>{u.id}</td>
                            <td>{u.name}</td>

                            <td>{u.age}</td>
                            <td>{u.no}</td>


                            <td>{u.roll}</td>
                            <button
          type="button"
          onClick={() => {
            console.log("Clicked:", u.id);
            dispatch(remove(u.id));
          }}
        >
          Delete
        </button>
                          
                            </tr>


                          

                        )
                    })}

                </tbody>
            </table>
        </div>

    )
};
