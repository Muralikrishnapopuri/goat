import { useEffect, useState } from "react";

const App = () => {
  const [Loading, setLoading] = useState(false);
  const [Todos, setTodos] = useState([]);
  const [Error, setError] = useState();
const [title,setTitle] = useState("");


const handleAdd = (e)=>{
 e.preventDefault();
 if(!title.trim()) return;


 const newTodo = {
  id:Date.now,
  title:title.trim(),
  completed : false,
 }
 setTodos([newTodo, ...Todos]);
 setTitle("");
}

const handleToggle=(id)=>{
  setTodos(
    Todos.map((todo)=>
      todo.id ===id? {...todo,completed:!todo.completed} :todo
    )
  );

};
const handleDelete = (id)=>{
setTodos(Todos.filter((todo)=>todo.id!=id));
}
  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=8")
    .then((res) => {
      if(!res.ok){
        throw new Error("Failed to load todos");
      }
      return res.json();
    })
    .then((data)=>{
      setTodos(data);
      setLoading(false);
    })
    .catch((err)=>{
      setError(err.message);
      setLoading(false);
    });
  }, []);

  return (


  <>
   <div className="container">
    <h2>Todo List (CruD)</h2>
    <form onSubmit={handleAdd}>

      <input type="text" placeholder="Add a new task" 
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>

    {Loading && <p>Loading Todos...</p>}
    {Error && <p style={{color:'#ef4444'}}>{Error}</p>}

<ul>
  {
    Todos.map((todo)=>(
    <li key={Todos.id}>
      <span onClick={()=>handleToggle(todo.id)}
        className={todo.completed?"completed":""}
        style={{cursor:"pointer",flex:1}}
        >
        {todo.completed ? "✓ " : "○ "}
        {todo.title}
      </span>
      <button className="delete-btn" onClick={()=>handleDelete(todo.id)}>Delete</button>

    </li>
      
    ))
  }
</ul>
  </div>;
  </>
   )
};

export default App;
