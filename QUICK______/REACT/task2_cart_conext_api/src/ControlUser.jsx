import { useContext } from "react"
import { UserContext } from "./CreationContext"

export const ControlUser = ()=>{

const {UserData,setUser}=useContext(UserContext);

const handleAdd=(e)=>{
    e.preventDefault();

    const formData = new FormData(e.target);
    
    const NewUser={
        name:formData.get("name"),
        age:formData.get("age"),
        no:formData.get("no"),
        roll:formData.get("roll"),
    }
    
setUser([...UserData,NewUser]);
e.target.reset();

}
    return(
        <>
        <div className="box">

            <p>Component ControlUser</p>

            <form onSubmit={handleAdd} style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"3px"}}>
                <input type="text" name="name" placeholder="Enter Name" required/>
                <input type="text" name="age" placeholder="Enter Age" required/>
                <input type="text" name="no" placeholder="Enter No" required/>
                <input type="text" name="roll" placeholder="Enter Roll" required/>
               
                    <button type="submit">Add User</button>

               
            </form>
        </div>
        </>
    )
}