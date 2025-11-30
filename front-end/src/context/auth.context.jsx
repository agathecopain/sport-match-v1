import { createContext, useContext, useEffect, useState } from "react";
import API from "../../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vérification de l'état de l'utilisateur
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
  const login = async (credentials) => {
    const res = await axios.post("/login", credentials, {
      withCredentials: true,
    });
    const token = res.data.token;
    localStorage.setItem(`Bearer: ${token}`)
    setUser(res.data.user);
  };

  // Déconnexion
  const logout = async () => {
    await API.post("/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);