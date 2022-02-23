import Home from "./Components/General/Home";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/General/Navbar";
function App() {
  return (
    <>
      <Navbar/>
       
       <Routes>
         <Route path="/" element={<Home/>}/>
       </Routes>
    </>
    
        
      
       
  )
}

export default App;
