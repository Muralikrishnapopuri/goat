import { useContext, useState } from "react"
import { ThemeContext } from "./ThemeContext";

const ChangeTheme = ()=>{
    const {theme, setTheme}= useContext(ThemeContext);

    return(
        <>
        <button onClick={()=>{
            setTheme(theme==='light'?'dark':'light')
        }}>Click to Change</button>
        </>
    )
}
export default ChangeTheme;

