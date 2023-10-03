import { createContext, useContext } from "react";

type AuthContextType = any;

export const AuthContext = createContext<AuthContextType>({});

export const useAuthContext = () => useContext(AuthContext);
