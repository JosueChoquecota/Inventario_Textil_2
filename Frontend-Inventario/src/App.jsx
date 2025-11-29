import React from "react"
import AppRouter from "./router/AppRouter"
import { AuthProvider } from "./context/AuthContext"

function App() {

  return (   
    <AuthProvider> {/* ✅ Solo AuthProvider, sin Router */}
      <AppRouter />
    </AuthProvider>
  )
}

export default App
