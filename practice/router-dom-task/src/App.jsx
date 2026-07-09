import { Routes ,Route,Link} from "react-router-dom";
import Home from "./Sections/Home";
import About from "./Sections/About";
import Contact from "./Sections/Contact";
import Blog from "./Sections/Blog";
import User from "./Sections/User";

function App(){
const userid1= 123;
const userid2= 456;

  return (
    <>
    <header style={{display:"block",justifyContent:"center",alignItems:"center",padding:"5px",background:"white",border:"2px solid green"}}>
      <ul style={{display:"flex",listStyleType:"none",gap:"12px",fontWeight:"bold"}}>
       <Link to="/"><li>HOME</li></Link> 
       <Link to="/about"> <li>ABOUT</li></Link>
        <Link to="/contact/543"><li>CONTACT</li></Link>
        <Link to="/blog/krish"><li>BLOG</li></Link>
        <Link to={`/user/${userid1}`}><li>USER</li></Link>
        <Link to="/service"><li>SERVICE</li></Link>
        </ul></header>
        
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact/:id" element={<Contact/>}/>
          <Route path="/blog/:name" element={<Blog/>} />
          <Route path="/user/:no" element={<User/>} />
          <Route path="/service" element={<Service/>} />


        </Routes>
        </>
  )
}
export default App;