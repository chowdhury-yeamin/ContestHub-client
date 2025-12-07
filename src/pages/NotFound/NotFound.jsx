import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-custom">404</h1>
        <h2 className="text-4xl font-semibold text-base-content mt-4">
          Page Not Found
        </h2>
        <p className="text-muted mt-4 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="bg-primary-custom hover:bg-primary-custom/90 text-white border-0 px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
        >
          <FaHome />
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
