import {  Route, Routes } from "react-router-dom"
import WorkOrderForm from "./components/WorkOrderForm"
import AuthPage from "./pages/Login"
import ProtectedRoute from "./routes/ProtectedRoute"


const App = () => {
  return (
    <Routes>

   
   <Route path='/auth' element={<AuthPage/>} />
   
    <Route path="/" element={<ProtectedRoute><WorkOrderForm/></ProtectedRoute>} />
    </Routes>
  )
}

export default App
