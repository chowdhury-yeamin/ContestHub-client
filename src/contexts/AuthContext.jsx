import { createContext, useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { auth } from "../firebase/firebase.config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://contest-hub-server-psi.vercel.app/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      // CRITICAL FIX: If no token, user is not logged in
      // This is normal for public pages - don't show error
      if (!token) {
        setLoading(false);
        setUser(null);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setToken(token);
        } else {
          // Token is invalid, clear it silently
          console.log("Token invalid, clearing...");
          localStorage.removeItem("token");
          setUser(null);
          setToken(null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);

        // Network error - don't clear token immediately
        if (
          error.message.includes("Failed to fetch") ||
          error.message.includes("NetworkError")
        ) {
          console.warn(
            "⚠️ Network error during auth check. Backend might be down."
          );
          // Keep token but set user to null for now
          setUser(null);
        } else {
          // For other errors, clear the token
          localStorage.removeItem("token");
          setUser(null);
          setToken(null);
        }
      } finally {
        // CRITICAL FIX: Always set loading to false
        // This prevents infinite loading state
        setLoading(false);
      }
    };

    checkAuth();
  }, []); // Run only once on mount

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
      setToken(data.token);
      setUser(data.user);

      Swal.fire({
        title: "Success!",
        text: "Registration successful",
        icon: "success",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#6366F1",
        timer: 1500,
        showConfirmButton: false,
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
      setToken(data.token);
      setUser(data.user);

      Swal.fire({
        title: "Success!",
        text: "Login successful",
        icon: "success",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#6366F1",
        timer: 1500,
        showConfirmButton: false,
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

  const googleSignIn = async () => {
    try {
      console.log("🚀 Starting Google Sign-In...");
      setLoading(true);

      const provider = new GoogleAuthProvider();
      provider.addScope("email");
      provider.addScope("profile");

      console.log("📱 Opening Google popup...");
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      if (!firebaseUser) {
        throw new Error("No user returned from Firebase");
      }

      console.log("✅ Firebase sign-in successful:", firebaseUser.email);

      console.log("🔑 Getting ID token...");
      const idToken = await firebaseUser.getIdToken();

      if (!idToken) {
        throw new Error("Failed to get Firebase ID token");
      }

      console.log("✅ Got ID token, length:", idToken.length);

      console.log("📤 Sending to backend:", `${API_URL}/auth/google`);
      const response = await fetch(`${API_URL}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      console.log("📥 Backend response status:", response.status);

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Unknown error" }));
        console.error("❌ Backend error:", errorData);
        throw new Error(errorData.error || `Backend error: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Backend response:", {
        hasUser: !!data.user,
        hasToken: !!data.token,
      });

      if (!data.user || !data.token) {
        throw new Error("Incomplete backend response");
      }

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);

      console.log("✅ Google sign-in complete!");

      Swal.fire({
        title: "Success!",
        text: "Google sign-in successful",
        icon: "success",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#6366F1",
        timer: 1500,
        showConfirmButton: false,
      });

      setLoading(false);
      return { success: true, user: data.user };
    } catch (err) {
      console.error("❌ Google sign-in error:", err);

      let errorMessage = "Failed to sign in with Google";

      if (err.code === "auth/popup-closed-by-user") {
        errorMessage = "Sign-in cancelled";
      } else if (err.code === "auth/popup-blocked") {
        errorMessage =
          "Popup was blocked by browser. Please allow popups for this site.";
      } else if (err.message) {
        errorMessage = err.message;
      }

      Swal.fire({
        title: "Sign-In Failed",
        text: errorMessage,
        icon: "error",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#6366F1",
      });

      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);

    Swal.fire({
      title: "Success!",
      text: "Logged out successfully",
      icon: "success",
      background: "#0f172a",
      color: "#fff",
      confirmButtonColor: "#6366F1",
      timer: 1500,
      showConfirmButton: false,
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
        token,
        setToken,
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
