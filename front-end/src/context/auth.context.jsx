import { createContext, useContext, useEffect, useState } from "react";
import API from "../../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // au démarrage, vérification de l'état de l'utilisateur
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data);
      } catch {
        setUser(null);
      }
    }
    fetchUser();
  }, []);

  // Connexion
  const login = async (credentials, navigate) => {
    const res = await API.post("auth/login", credentials, {
      withCredentials: true,
    });
    const token = res.data.token;
    const user = res.data.user;
    console.log(res);
    localStorage.setItem("token", token);
    setUser(user);
    if (navigate) navigate(`/user/${user.username}`);
  };

  // Déconnexion
  const logout = async () => {
    await API.post("auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
