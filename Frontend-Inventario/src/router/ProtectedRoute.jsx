import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Common/Spinner";

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <Spinner fullScreen size="3rem" />;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
}