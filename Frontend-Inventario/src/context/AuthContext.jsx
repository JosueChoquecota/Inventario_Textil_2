import { createContext, useContext, useEffect, useState } from "react";
import { login as loginApi, logout as logoutApi, checkSession } from "../api/authApi";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context;
}

export const AuthProvider =({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const checkAuth = async () => {
            try {
                const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
                if (storedUser) {
                    const userData = JSON.parse(storedUser);
                    setUser(userData);
                }

                try {
                    const serverUser = await checkSession();
                    setUser(serverUser);

                    if (localStorage.getItem("user")) {
                        localStorage.setItem("user", JSON.stringify(serverUser));
                    } else if (sessionStorage.getItem("user")) {
                        sessionStorage.setItem("user", JSON.stringify(serverUser));
                    }
                } catch (sessionError) {
                    console.log("No hay sesión activa en el servidor")
                    localStorage.removeItem("user");
                    sessionStorage.removeItem("user");
                    setUser(null);
                }
            } catch (error) {
                console.error("Error checking auth:", error)
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [])

    const login = async (correo, contrasena, remember = false) => {
            const userData = await loginApi(correo, contrasena)
            setUser(userData)

            if (remember) {
                localStorage.setItem("user", JSON.stringify(userData))
            sessionStorage.removeItem("user")
            } else {
                sessionStorage.setItem("user", JSON.stringify(userData))
                localStorage.removeItem("user")
            }
            return userData
    }

    const logout = async () => {
        try {
            await logoutApi()
        } catch (error) {
            console.error("Error during logout:", error)
        } finally {
            setUser(null)
            localStorage.removeItem("user")
            sessionStorage.removeItem("user")
        }
    } 

    const hasRole = (roleName) => {
        return user?.rol === roleName
    }

    const hasAnyRole = (...roles) => {
        return roles.includes(user?.rol)
    }

    const value = {
        user,
        loading,
        login,
        logout,
        hasRole,
        hasAnyRole,
        isAuthenticated: !!user,
        isAdmin: user?.idRol === 1,
        isVendedor: user?.idRol === 3,
        isAlmacenero: user?.idRol === 4,
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}