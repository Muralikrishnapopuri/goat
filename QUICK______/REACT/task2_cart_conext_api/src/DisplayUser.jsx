import { useContext } from "react";
import { UserContext } from "./CreationContext";

export const DisplayUser = () => {
  const { UserData } = useContext(UserContext);
  return (
    <div className="box">
      <h3>COmponent DisplayUSer </h3>
      <strong>Users</strong>

      <table>
       <thead>

     
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>No</th>
          <th>Roll</th>
        </tr>
  </thead>
        
 <tbody>
        {UserData.map((user,index) => {
          return (

        
          <tr key={index}>
            <td>{user.name}</td>
            <td>{user.age}</td>
            <td>{user.no}</td>
            <td>{user.roll}</td>
          </tr>
            )
         ;
        })}
        </tbody>
      </table>
    </div>
  );
};
