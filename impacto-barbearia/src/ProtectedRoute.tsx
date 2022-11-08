import { Navigate } from "react-router-dom";

interface IProtectedRouteProps {
    token: String,
    children: JSX.Element
}

const ProtectedRoute = ({ token, children }: IProtectedRouteProps) => {
    if (!token) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;