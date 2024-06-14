import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useAuth = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const isAuth = useSelector((state) => state.login.isAuth)

    useEffect(() => {
        if (isAuth) {
            setAuthenticated(true)
        } else {
            setAuthenticated(false)
        }
    }, [isAuth])

    return { authenticated };
};


