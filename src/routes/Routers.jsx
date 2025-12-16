import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
const Home = lazy(() => import("../pages/Home/Home"));
const AllContests = lazy(() => import("../pages/AllContests/AllContests"));
const ContestDetails = lazy(() =>
  import("../pages/ContestDetails/ContestDetails")
);
const Leaderboard = lazy(() => import("../pages/Leaderboard/Leaderboard"));
const About = lazy(() => import("../pages/About/About"));
const Contact = lazy(() => import("../pages/Contact/Contact"));
const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));
const DashboardLayout = lazy(() =>
  import("../pages/Dashboard/DashboardLayout")
);
import PrivateRoute from "../utils/PrivateRoute";
import RoleRoute from "../utils/RoleRoute";
import ErrorBoundary from "../utils/ErrorBoundary";

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
import HelpCenter from "../pages/helpCenter/HelpCenter";
import Terms from "../pages/Terms/Terms";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import ContestRules from "../pages/ContestRules/ContestRules";
import CreatorGuide from "../pages/CreatorGuide/CreatorGuide.JSX";
import CreatorRequests from "../pages/Dashboard/AdminDashboard/CreatorRequests";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div className="min-h-screen" />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/all-contests",
        element: (
          <Suspense fallback={<div className="min-h-screen" />}>
            <AllContests />
          </Suspense>
        ),
      },
      {
        path: "/contest/:id",
        element: (
          <PrivateRoute>
            <Suspense fallback={<div className="min-h-screen" />}>
              <ContestDetails />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/leaderboard",
        element: (
          <Suspense fallback={<div className="min-h-screen" />}>
            <Leaderboard />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<div className="min-h-screen" />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<div className="min-h-screen" />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/help-center",
        element: <HelpCenter />,
      },
      {
        path: "/terms",
        element: <Terms />,
      },
      {
        path: "/privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/rules",
        element: <ContestRules></ContestRules>,
      },
      {
        path: "/creator-guide",
        element: <CreatorGuide></CreatorGuide>,
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<div className="min-h-screen" />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<div className="min-h-screen" />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Suspense fallback={<div className="min-h-screen" />}>
              <DashboardLayout />
            </Suspense>
          </PrivateRoute>
        ),
        children: [
          {
            path: "participated",
            element: <ParticipatedContests />,
          },
          {
            path: "payment/:id",
            element: <Payment />,
          },
          {
            path: "payment-success",
            element: <PaymentSuccess />,
          },
          {
            path: "payment-canceled",
            element: <PaymentCancelled />,
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
              <RoleRoute allowedRoles={["creator", "admin"]}>
                <AddContest />
              </RoleRoute>
            ),
          },
          {
            path: "my-contests",
            element: (
              <RoleRoute allowedRoles={["creator", "admin"]}>
                <MyContests />
              </RoleRoute>
            ),
          },
          {
            path: "submissions",
            element: (
              <RoleRoute allowedRoles={["creator", "admin"]}>
                <Submissions />
              </RoleRoute>
            ),
          },
          {
            path: "submissions/:id",
            element: (
              <RoleRoute allowedRoles={["creator", "admin"]}>
                <Submissions />
              </RoleRoute>
            ),
          },
          {
            path: "edit-contest/:id",
            element: (
              <RoleRoute allowedRoles={["creator", "admin"]}>
                <EditContest />
              </RoleRoute>
            ),
          },
          {
            path: "manage-users",
            element: (
              <RoleRoute allowedRoles={["admin"]}>
                <ManageUsers />
              </RoleRoute>
            ),
          },
          {
            path: "creator-requests",
            element: (
              <RoleRoute allowedRoles={["admin"]}>
                <CreatorRequests />
              </RoleRoute>
            ),
          },
          {
            path: "manage-contests",
            element: (
              <RoleRoute allowedRoles={["admin"]}>
                <ManageContests />
              </RoleRoute>
            ),
          },
        ],
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<div className="min-h-screen" />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);
