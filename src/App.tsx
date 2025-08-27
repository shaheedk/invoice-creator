import {  Route, Routes } from "react-router-dom"
import WorkOrderForm from "./components/WorkOrderForm"
import AuthPage from "./pages/Login"
import CreateCustomerForm from "./components/CustomerForm"



const App = () => {
  return (
    <Routes>

   
   <Route path='/auth' element={<AuthPage/>} />
   
    <Route path="/" element={<WorkOrderForm/>} />
    <Route path="/customer" element={<CreateCustomerForm/>} />
    </Routes>
  )
}

export default App
