import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import { FaGoogle } from "react-icons/fa";

const Register = () => {
  const { register: registerUser, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const result = await registerUser(
      data.name,
      data.email,
      data.password,
      data.photoURL
    );
    setLoading(false);
    if (result.success) {
      navigate("/");
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const result = await googleSignIn();
    setLoading(false);
    if (result.success) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
      {/* Register page with color scheme */}
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-base-content">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-muted">
            Or{" "}
            <Link
              to="/login"
              className="font-medium text-primary-custom hover:text-accent-custom"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-base-content mb-2"
              >
                Full Name
              </label>
              <input
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-error">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-base-content mb-2"
              >
                Email address
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-error">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-base-content mb-2"
              >
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type="password"
                className="input input-bordered w-full"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-error">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="photoURL"
                className="block text-sm font-medium text-base-content mb-2"
              >
                Photo URL (Optional)
              </label>
              <input
                {...register("photoURL")}
                type="url"
                className="input input-bordered w-full"
                placeholder="https://example.com/photo.jpg"
              />
              {errors.photoURL && (
                <p className="mt-1 text-sm text-error">
                  {errors.photoURL.message}
                </p>
              )}
            </div>
          </div>

          <div>
            {/* Primary button with color scheme */}
            <button
              type="submit"
              disabled={loading}
              className="bg-primary-custom hover:bg-primary-custom/90 text-white border-0 w-full px-4 py-3 rounded-lg font-semibold transition-colors"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign up"
              )}
            </button>
          </div>

          <div className="divider">OR</div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="btn btn-outline border-primary-custom text-primary-custom hover:bg-primary-custom hover:text-white w-full"
          >
            <FaGoogle className="mr-2" />
            Sign up with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
