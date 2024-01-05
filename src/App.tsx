import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./view/Login/Login"
import Master from "./view/User/Master"
import { AuthProvider } from "./context/loginContext"
import Equipe from "./view/User/Equipe"
import Saude from "./view/User/Saude"
import { SidebarProvider } from "./context/sidebarContext"

function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/master/:_id" element={<Master/>}/>
            <Route path="/equipe/:_id" element={<Equipe/>}/>
            <Route path="/saude/:_id" element={<Saude/>}/>
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </AuthProvider>
  )
}

export default App