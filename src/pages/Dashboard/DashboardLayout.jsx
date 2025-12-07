import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  FaHome,
  FaTrophy,
  FaUser,
  FaPlus,
  FaList,
  FaFileAlt,
  FaUsers,
  FaCog,
} from "react-icons/fa";

const DashboardLayout = () => {
  const { user } = useAuth();
  const location = useLocation();

  const userRoutes = [
    {
      path: "/dashboard/participated",
      label: "My Participated Contests",
      icon: FaList,
    },
    {
      path: "/dashboard/winnings",
      label: "My Winning Contests",
      icon: FaTrophy,
    },
    { path: "/dashboard/profile", label: "My Profile", icon: FaUser },
  ];

  const creatorRoutes = [
    { path: "/dashboard/add-contest", label: "Add Contest", icon: FaPlus },
    {
      path: "/dashboard/my-contests",
      label: "My Created Contests",
      icon: FaList,
    },
    {
      path: "/dashboard/submissions",
      label: "Submitted Tasks",
      icon: FaFileAlt,
    },
    ...userRoutes,
  ];

  const adminRoutes = [
    { path: "/dashboard/manage-users", label: "Manage Users", icon: FaUsers },
    {
      path: "/dashboard/manage-contests",
      label: "Manage Contests",
      icon: FaCog,
    },
    ...creatorRoutes,
  ];

  const routes =
    user?.role === "admin"
      ? adminRoutes
      : user?.role === "creator"
      ? creatorRoutes
      : userRoutes;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
      {/* Dashboard layout with color scheme */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-xl sticky top-20 sm:top-24">
            <div className="card-body">
              <h2 className="card-title mb-4">Dashboard</h2>
              <ul className="menu menu-vertical">
                {routes.map((route) => (
                  <li key={route.path}>
                    <Link
                      to={route.path}
                      className={
                        location.pathname === route.path
                          ? "active bg-primary-custom text-white"
                          : "hover:bg-primary-custom/10 hover:text-primary-custom"
                      }
                    >
                      <route.icon />
                      {route.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
