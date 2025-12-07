import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home/Home";
import AllContests from "../pages/AllContests/AllContests";
import ContestDetails from "../pages/ContestDetails/ContestDetails";
import Leaderboard from "../pages/Leaderboard/Leaderboard";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import NotFound from "../pages/NotFound/NotFound";
import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import PrivateRoute from "../utils/PrivateRoute";
import RoleRoute from "../utils/RoleRoute";

// User Dashboard
import ParticipatedContests from "../pages/Dashboard/UserDashboard/ParticipatedContests";
import WinningContests from "../pages/Dashboard/UserDashboard/WinningContests";
import Profile from "../pages/Dashboard/UserDashboard/Profile";

// Creator Dashboard
import AddContest from "../pages/Dashboard/CreatorDashboard/AddContest";
import MyContests from "../pages/Dashboard/CreatorDashboard/MyContests";
import Submissions from "../pages/Dashboard/CreatorDashboard/Submissions";
import EditContest from "../pages/Dashboard/CreatorDashboard/EditContest";

// Admin Dashboard
import ManageUsers from "../pages/Dashboard/AdminDashboard/ManageUsers";
import ManageContests from "../pages/Dashboard/AdminDashboard/ManageContests";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/all-contests",
        element: <AllContests />,
      },
      {
        path: "/contest/:id",
        element: (
          <PrivateRoute>
            <ContestDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          {
            path: "participated",
            element: <ParticipatedContests />,
          },
          {
            path: "winnings",
            element: <WinningContests />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "add-contest",
            element: (
              <RoleRoute allowedRoles={['creator', 'admin']}>
                <AddContest />
              </RoleRoute>
            ),
          },
          {
            path: "my-contests",
            element: (
              <RoleRoute allowedRoles={['creator', 'admin']}>
                <MyContests />
              </RoleRoute>
            ),
          },
          {
            path: "submissions/:id",
            element: (
              <RoleRoute allowedRoles={['creator', 'admin']}>
                <Submissions />
              </RoleRoute>
            ),
          },
          {
            path: "edit-contest/:id",
            element: (
              <RoleRoute allowedRoles={['creator', 'admin']}>
                <EditContest />
              </RoleRoute>
            ),
          },
          {
            path: "manage-users",
            element: (
              <RoleRoute allowedRoles={['admin']}>
                <ManageUsers />
              </RoleRoute>
            ),
          },
          {
            path: "manage-contests",
            element: (
              <RoleRoute allowedRoles={['admin']}>
                <ManageContests />
              </RoleRoute>
            ),
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
