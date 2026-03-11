import { useEffect, type JSX } from "react";
import { Navigate, Route, Routes } from "react-router";
import LockScreen from "../auth/screens/LockScreen";
import LoginWithPhrase from "../auth/screens/LoginWithPhrase";
import SignUp from "../auth/screens/SignUp";
import Home from "../home/screens/Home";
import SettingsScreen from "../settings/screens/SettingsScreen";
import { ROUTES } from "./Routes";
import getAuthState from "../auth/logic/getAuthState";

function InitialRedirect() {
  const { hasSession, hasAccount } = getAuthState();

  if (hasSession) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  if (hasAccount) {
    return <Navigate to={ROUTES.LOCKSCREEN} replace />;
  }

  return <Navigate to={ROUTES.SIGNUP} replace />;
}

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { hasSession } = getAuthState();

  if (!hasSession) {
    return <Navigate to={ROUTES.ROOT} replace />;
  }

  return children;
};

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { hasSession } = getAuthState();

  if (hasSession) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children;
};

function Navigation() {
  useEffect(() => {
    // 1. Check the system preference
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // 2. Set the dark mode class on the root element
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // 3. Optional: Listen for real-time changes without refreshing
    const watcher = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e: MediaQueryListEvent) => {
      if (e.matches) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    };

    watcher.addEventListener("change", listener);
    return () => watcher.removeEventListener("change", listener);
  }, []);

  return (
    <div className="flex flex-1 flex-col h-full w-full overflow-hidden bg-background">
      <Routes>
        {/* Redirect Initial*/}
        <Route path={ROUTES.ROOT} element={<InitialRedirect />} />

        {/* Public Routes */}
        <Route
          path={ROUTES.SIGNUP}
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        <Route
          path={ROUTES.LOCKSCREEN}
          element={
            <PublicRoute>
              <LockScreen />
            </PublicRoute>
          }
        />

        <Route
          path={ROUTES.LOGIN_WITH_PHRASE}
          element={
            <PublicRoute>
              <LoginWithPhrase />
            </PublicRoute>
          }
        />

        {/* Private Routes */}
        <Route
          path={ROUTES.HOME}
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.SETTINGS}
          element={
            <ProtectedRoute>
              <SettingsScreen />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default Navigation;
