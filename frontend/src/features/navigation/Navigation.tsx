import { useEffect, type JSX } from "react";
import { Route } from "react-router";
import { Routes } from "react-router";
import App from "../../App";
import SignUp from "../auth/screens/SignUp";
import LogIn from "../auth/screens/LogIn";
import Home from "../home/screens/Home";
import SessionManager from "../session/SessionManager";
import ROUTES from "./Routes";
import { useNavigate } from "react-router";
import CacheService from "../cache/CacheService";
import CACHE_KEYS from "../cache/CACHE_KEYS";
import CreatePassword from "../password/screens/CreatePassword";
import ViewPassword from "../password/screens/ViewPassword";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const masterKey = SessionManager.getMasterKey();
  if (!masterKey) return <Navigate to={ROUTES.ROOT} replace />;
  return children;
};

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const masterKey = SessionManager.getMasterKey();
  if (masterKey) return <Navigate to={ROUTES.HOME} replace />;
  return children;
};

function InitialRedirect() {
  const masterKey = SessionManager.getMasterKey();
  const publicID = CacheService.retrieve(CACHE_KEYS.PUBLIC_ID);
  if (masterKey) return <Navigate to={ROUTES.HOME} replace />;
  if (publicID) return <Navigate to={ROUTES.LOGIN} replace />;
  return <App />;
}

function Navigation() {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<InitialRedirect />} />

      <Route
        path={ROUTES.ROOT}
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />

      <Route
        path={ROUTES.LOGIN}
        element={
          <PublicRoute>
            <LogIn />
          </PublicRoute>
        }
      />

      <Route
        path={ROUTES.HOME}
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.CREATE_PASSWORD}
        element={
          <ProtectedRoute>
            <CreatePassword />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.VIEW_PASSWORD}
        element={
          <ProtectedRoute>
            <ViewPassword />
          </ProtectedRoute>
        }
      />

      <Route />
    </Routes>
  );
}

export default Navigation;
