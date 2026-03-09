import { useEffect, type JSX } from "react";
import { Navigate, Route, Routes } from "react-router";
import LockScreen from "../auth/screens/LockScreen";
import LoginWithPhrase from "../auth/screens/LoginWithPhrase";
import SignUp from "../auth/screens/SignUp";
import { CACHE_KEYS } from "../cache/CACHE_KEYS";
import CacheService from "../cache/CacheService";
import Home from "../home/screens/Home";
import SessionManager from "../session/SessionManager";
import SettingsScreen from "../settings/screens/SettingsScreen";
import { ROUTES } from "./Routes";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const masterKey = SessionManager.getMasterKey();
  if (!masterKey) return <Navigate to={ROUTES.ROOT} replace />;
  return children;
};

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const masterKey = SessionManager.getMasterKey();
  if (masterKey) return <Navigate to={ROUTES.HOME} replace />;
  const publicID = CacheService.retrieve(CACHE_KEYS.PUBLIC_ID);
  if (publicID) return children;
  return <SignUp />;
};

function InitialRedirect() {
  const masterKey = SessionManager.getMasterKey();
  const publicID = CacheService.retrieve(CACHE_KEYS.PUBLIC_ID);
  if (masterKey) return <Navigate to={ROUTES.HOME} replace />;
  if (publicID) return <Navigate to={ROUTES.LOCKSCREEN} replace />;
  return <SignUp />;
}

function Navigation() {
  // TODO: To be checked
  useEffect(() => {
    // 1. Vérifie la préférence système
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // 2. Applique la classe .dark à l'élément racine
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // 3. Optionnel : Écouter le changement en temps réel sans rafraîchir
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

        <Route
          path={ROUTES.HOME}
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        {/*<Route
          path={ROUTES.CREATE_PASSWORD}
          element={
            <ProtectedRoute>
              <CreatePassword />
            </ProtectedRoute>
          }
        />*/}
        {/* <Route
          path={ROUTES.VIEW_PASSWORD}
          element={
            <ProtectedRoute>
              <ViewPassword />
            </ProtectedRoute>
          }
        /> */}

        <Route />
        <Route
          path={ROUTES.SETTINGS}
          element={
            <ProtectedRoute>
              <SettingsScreen />
            </ProtectedRoute>
          }
        />

        <Route />
      </Routes>
    </div>
  );
}

export default Navigation;
