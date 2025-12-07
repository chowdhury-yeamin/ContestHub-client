import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const { login, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const result = await login(data.email, data.password);
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
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-base-content">
            Sign in to ContestHub
          </h2>
          <p className="mt-2 text-center text-sm text-muted">
            Or{" "}
            <Link
              to="/register"
              className="font-medium text-primary-custom hover:text-accent-custom"
            >
              create a new account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
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
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary-custom hover:bg-primary-custom/90 text-white border-0 w-full px-4 py-3 rounded-lg font-semibold transition-colors"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign in"
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
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
