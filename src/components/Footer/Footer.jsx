import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import logo from "../../assets/contest-project-logo.png";

const Footer = () => {
  return (
    <footer className="bg-base-100/90 backdrop-blur-md shadow-md rounded-3xl z-50 mx-auto max-w-11/12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* Logo + Website Name */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-8 w-8" />
          <span className="font-bold text-xl text-base-content">ContestHub</span>
        </Link>

        {/* Copyright */}
        <p className="text-muted text-sm text-center md:text-left">
          &copy; 2025 ContestHub. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex space-x-4">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-primary-custom"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-primary-custom"
          >
            <FaLinkedinIn size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
