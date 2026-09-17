import { useDispatch } from "react-redux";
import { register } from "./UserSlice";

export const ControlUser = () => {
    const dispatch = useDispatch();
    

    const handleRegister=(e)=>{
        e.preventDefault();
const formData = new FormData(e.target);
  
    const data = {
        id:formData.get("id"),
        name:formData.get("name"),
        age:formData.get("age"),
        no:formData.get("no"),
        roll:formData.get("roll"),


    }
     dispatch(register(data));
     e.target.reset();
     

    }
  return (
    <div className="box">
      <form onSubmit={handleRegister}>
       
          <input type="text" name="id" placeholder="Enter Id" />
          <input type="text" name="name" placeholder="Enter Name" />
          <input type="text" name="age" placeholder="Enter Age"/>
          <input type="text" name="no" placeholder="Enter NO"/>
          <input type="text" name="roll" placeholder="Enter Rolls"/>

          <div style={{ padding: "5px", border: "2px dotted white" }}>
            <button style={{ backgroundColor: "brown" ,width:"100%"}} type="submit">
              Resgiter
            </button>
          </div>
        
      </form>
    </div>
  );
};
