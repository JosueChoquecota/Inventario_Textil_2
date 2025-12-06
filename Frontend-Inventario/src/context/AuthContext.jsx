import { createContext, useContext, useEffect, useState } from "react";
import { login as loginApi, logout as logoutApi, checkSession } from "../api/authApi";
import { getPermisosPorRol } from "../api/permisosApi";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [permissions, setPermissions] = useState([])
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

                    localStorage.removeItem("user");
                    sessionStorage.removeItem("user");
                    setUser(null);
                }
            } catch (error) {

            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [])

    // ✅ Cargar permisos cuando cambia el usuario
    useEffect(() => {
        const loadPermissions = async () => {
            if (user?.idRol) {
                try {
                    const perms = await getPermisosPorRol(user.idRol)
                    setPermissions(perms)
                } catch (error) {

                    setPermissions([])
                }
            } else {
                setPermissions([])
            }
        }
        loadPermissions()
    }, [user])

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

        } finally {
            setUser(null)
            setPermissions([])
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

    // ✅ Helper para verificar permisos
    // Ejemplo: checkPermission('Trabajadores', 'canCreate')
    const checkPermission = (recursoNombre, accion) => {
        // Si es admin, tiene acceso total (opcional, pero recomendado)
        if (user?.idRol === 1) return true;

        const permiso = permissions.find(p => p.recurso.nombre === recursoNombre)

        // DEBUG: Comentar en producción


        if (!permiso) return false;

        // Si la acción es 'canRead', verificar flag canRead
        return permiso[accion] === true;
    }

    const value = {
        user,
        permissions,
        loading,
        login,
        logout,
        hasRole,
        hasAnyRole,
        checkPermission,
        isAuthenticated: !!user,
        isAdmin: user?.idRol === 1,
        isVendedor: user?.idRol === 3,
        isAlmacenero: user?.idRol === 4,
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}