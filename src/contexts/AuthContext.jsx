import { createContext, useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { auth, googleProvider } from "../firebase/firebase.config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          // Token is invalid
          localStorage.removeItem("token");
          setUser(null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const register = async (name, email, password, photoURL, role = "user") => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      localStorage.setItem("token", data.token);
      setUser(data.user);

      Swal.fire({
        title: "Success!",
        text: "Registration successful",
        icon: "success",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#6366F1",
      });

      setLoading(false);
      return { success: true };
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.message,
        icon: "error",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#6366F1",
      });
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("token", data.token);
      setUser(data.user);

      Swal.fire({
        title: "Success!",
        text: "Login successful",
        icon: "success",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#6366F1",
      });

      setLoading(false);
      return { success: true };
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.message,
        icon: "error",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#6366F1",
      });
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  async function googleSignIn() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      if (!user) throw new Error("No user returned from Firebase");

      const idToken = await user.getIdToken();
      if (!idToken) throw new Error("Failed to get Firebase ID token");

      const response = await fetch(`${API_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      const data = await response.json().catch(() => null);
      if (!data) throw new Error("Invalid JSON response from backend");
      if (data.error) throw new Error(data.error);

      if (!data.user || !data.token)
        throw new Error("Incomplete backend response");

      console.log("Backend auth response:", data);

      return { user: data.user, token: data.token };
    } catch (err) {
      console.error("Google sign-in error:", err.message || err);
      alert(`Login failed: ${err.message || err}`);
    }
  }

  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    Swal.fire({
      title: "Success!",
      text: "Logged out successfully",
      icon: "success",
      background: "#0f172a",
      color: "#fff",
      confirmButtonColor: "#6366F1",
    });
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        googleSignIn,
        logout,
        getAuthHeaders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
