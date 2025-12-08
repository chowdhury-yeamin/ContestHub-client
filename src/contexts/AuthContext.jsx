import { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase.config";
import api from "../services/api";
import Swal from "sweetalert2";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // TODO: Get user data from backend API
          // const response = await api.get('/users/profile');
          // const userData = response.data;

          // For now, use Firebase user data
          const userData = {
            _id: firebaseUser.uid,
            name: firebaseUser.displayName || "User",
            email: firebaseUser.email,
            photoURL:
              firebaseUser.photoURL ||
              "https://ui-avatars.com/api/?name=User&background=random",
            role: "user", // TODO: Get from backend
          };

          // Get Firebase ID token for backend authentication
          const token = await firebaseUser.getIdToken();
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(userData));
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;
      const token = await firebaseUser.getIdToken();

      // TODO: Get user data from backend API
      // const response = await api.get('/users/profile', {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      // const userData = response.data;

      const userData = {
        _id: firebaseUser.uid,
        name: firebaseUser.displayName || "User",
        email: firebaseUser.email,
        photoURL:
          firebaseUser.photoURL ||
          "https://i.ibb.co/5vQvBdP/default-avatar.png",
        role: "user", // TODO: Get from backend
      };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back!",
        timer: 2000,
        showConfirmButton: false,
      });

      return { success: true };
    } catch (error) {
      let errorMessage = "Invalid email or password";
      if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address";
      }

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMessage,
      });
      return { success: false };
    }
  };

  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      const token = await firebaseUser.getIdToken();

      // TODO: Send user data to backend to create/update user
      // await api.post('/auth/google', {
      //   uid: firebaseUser.uid,
      //   email: firebaseUser.email,
      //   name: firebaseUser.displayName,
      //   photoURL: firebaseUser.photoURL
      // });

      const userData = {
        _id: firebaseUser.uid,
        name: firebaseUser.displayName || "User",
        email: firebaseUser.email,
        photoURL:
          firebaseUser.photoURL ||
          "https://i.ibb.co/5vQvBdP/default-avatar.png",
        role: "user", // TODO: Get from backend
      };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome!",
        timer: 2000,
        showConfirmButton: false,
      });

      return { success: true };
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "Google sign-in failed",
      });
      return { success: false };
    }
  };

  const register = async (name, email, password, photoURL) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      // Update Firebase profile with name and photo
      if (name || photoURL) {
        await updateProfile(firebaseUser, {
          displayName: name,
          photoURL: photoURL || null,
        });
      }

      const token = await firebaseUser.getIdToken();

      // TODO: Send user data to backend to create user
      // await api.post('/auth/register', {
      //   uid: firebaseUser.uid,
      //   name: name,
      //   email: email,
      //   photoURL: photoURL
      // });

      const userData = {
        _id: firebaseUser.uid,
        name: name,
        email: email,
        photoURL:
          photoURL ||
          firebaseUser.photoURL ||
          "https://ui-avatars.com/api/?name=" +
            encodeURIComponent(name) +
            "&background=random",
        role: "user", // TODO: Get from backend
      };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Welcome to ContestHub!",
        timer: 2000,
        showConfirmButton: false,
      });

      return { success: true };
    } catch (error) {
      let errorMessage = "Registration failed";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email is already registered";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password should be at least 6 characters";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address";
      }

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: errorMessage,
      });
      return { success: false };
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have been logged out successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const updateUser = async (updates) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error("No user logged in");
      }

      // Update Firebase profile if name or photoURL changed
      if (updates.name || updates.photoURL) {
        await updateProfile(currentUser, {
          displayName: updates.name || currentUser.displayName,
          photoURL: updates.photoURL || currentUser.photoURL,
        });
      }

      // TODO: Update user in backend
      // await api.put('/users/profile', updates);

      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile has been updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });

      return { success: true };
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message || "Failed to update profile",
      });
      return { success: false };
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    googleSignIn,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
