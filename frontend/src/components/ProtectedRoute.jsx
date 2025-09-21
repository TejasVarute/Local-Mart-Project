import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants'

const ProtectedRoute = ({ children, allowedRoles, redirectPath = "/customer/login" }) => {
    const [isAuthorized, setAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setAuthorized(false));
    }, []);

    const refreshToken = async () => {
        const refresh = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/token/refresh/", { refresh });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setAuthorized(true);
            } else {
                setAuthorized(false);
            }
        } catch (error) {
            console.error(error);
            setAuthorized(false);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setAuthorized(false);
            return;
        }

        try {
            const decoded = jwtDecode(token);
            const now = Date.now() / 1000;

            if (decoded.exp < now) {
                await refreshToken();
                return;
            }

            // ✅ Role check
            if (!allowedRoles || allowedRoles.includes(decoded.role)) {
                setAuthorized(true);
            } else {
                setAuthorized(false);
            }
        } catch (err) {
            console.error("Token decode error:", err);
            setAuthorized(false);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;