import Dashboard from "./Pages/dashboard"
import Signin from "./Pages/Signin"
import Signup from "./Pages/Signup"
import { BrowserRouter, Router, Route, Routes } from "react-router-dom"



const App = () => {
  return (<BrowserRouter>
    <Routes>
    <Route path="/signup" element={<Signup/>} />
    <Route path="/" element={<Signin/>} />
    <Route path="/dashboard" element={<Dashboard/>} />

  
    </Routes>
    </BrowserRouter> ) 
}
export default App