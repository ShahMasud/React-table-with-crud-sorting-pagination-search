import Home from "./Components/General/Home";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/General/Navbar";

import TableOne from "./Components/General/TableOne";
function App() {
  return (
    <>
      <Navbar/>
       
       <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/TableOne" element={<TableOne/>}/>

       </Routes>
    </>
    
        
      
       
  )
}

export default App;
