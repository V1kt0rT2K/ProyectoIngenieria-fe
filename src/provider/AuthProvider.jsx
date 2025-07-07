import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [session, setSession_] = useState(localStorage.getItem("session"));

    const setSession = (newSession) => {
        setSession_(newSession);
    };

    useEffect(() => {
        if (session) {
            localStorage.setItem("session", session);
        } else {
            localStorage.removeItem("session");
        }
    }, [session]);

    const contextValue = useMemo(
        () => ({
            session,
            setSession
        }), [session]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
