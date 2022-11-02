import { useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

// Pages
import Login from "./pages/Login"
import Todos from "./pages/Todos"
import Register from "./pages/Register"
import Logout from "./pages/Logout"
import Verify from "./pages/Verify"

// config
import './config/axios.js'

// styles
import 'notyf/notyf.min.css'
import "./assets/css/form.css"
import "./assets/css/loader.css"

function App() {
	const [logged, setLogged] = useState(localStorage.getItem("accessToken") ? true : false)
	const [loading, setLoading] = useState(false)
    
    return (   
        <>
            <BrowserRouter>
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            <Todos 
                                logged={logged} setLogged={setLogged}
                            />
                        } 
                    />
                    <Route 
                        path="/login" 
                        element={
                            <Login 
                                logged={logged} setLogged={setLogged} 
                                loading={loading} setLoading={setLoading} 
                            />
                        } 
                    />
                    <Route 
                        path="/register" 
                        element={
                            <Register 
                                logged={logged} setLogged={setLogged} 
                                loading={loading} setLoading={setLoading} 
                            />
                        } 
                    />
                    <Route 
                        path="/logout" 
                        element={
                            <Logout 
                                logged={logged} setLogged={setLogged} 
                                loading={loading} setLoading={setLoading} 
                            />
                        } 
                    />
                    <Route 
                        path="/verify/:token" 
                        element={
                            <Verify 
                                logged={logged} setLogged={setLogged} 
                                loading={loading} setLoading={setLoading} 
                            />
                        } 
                    />
                    <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App