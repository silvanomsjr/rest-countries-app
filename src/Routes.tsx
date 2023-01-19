import { Routes, Route } from "react-router-dom";

import Home from './pages/Home'
import Country from "./pages/Country";

export default function MainRoutes(){
  return(
    <Routes>
      <Route path="/"  element={<Home />}/>
      <Route path="/country/:id" element={<Country />} />
    </Routes>
  )
}
