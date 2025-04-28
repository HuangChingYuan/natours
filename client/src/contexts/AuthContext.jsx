import { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getCurrentUser = async () => {
    try {
      let response = await authService.isLoggedIn();
      if (response.data.status === "success") {
        setUser(response.data.data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, getCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
