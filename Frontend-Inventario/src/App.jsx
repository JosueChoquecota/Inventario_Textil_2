import React from "react"
import AppRouter from "./router/AppRouter"
import { AuthProvider } from "./context/AuthContext"
import { ThemeProvider } from "./context/ThemeContext"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <AuthProvider> {/* ✅ Solo AuthProvider, sin Router */}
      <ThemeProvider>
        <AppRouter />
        <ToastContainer position="top-right" autoClose={3000} />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
