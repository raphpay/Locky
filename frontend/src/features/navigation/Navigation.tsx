import { useEffect, useState } from "react";
import { Route } from "react-router";
import { Routes } from "react-router";
import App from "../../App";
import SignUp from "../auth/screens/SignUp";
import LogIn from "../auth/screens/LogIn";
import Home from "../home/screens/Home";
import SessionManager from "../session/SessionManager";
import ROUTES from "./ROUTES";
import { useNavigate } from "react-router";
import CacheService from "../cache/CacheService";
import CACHE_KEYS from "../cache/CACHE_KEYS";
import CreatePassword from "../password/screens/CreatePassword";
import ViewPassword from "../password/screens/ViewPassword";

function Navigation() {
  const navigate = useNavigate();
  const [masterPassword, setMasterPassword] = useState<string>("");
  const [userID, setUserID] = useState<string | null>(null);

  useEffect(() => {
    const masterKey = SessionManager.getMasterKey();
    if (!masterKey) {
      navigate(ROUTES.ROOT);
      const publicID = CacheService.retrieve(CACHE_KEYS.PUBLIC_ID);
      if (publicID) {
        navigate(ROUTES.LOGIN);
      }
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<App />} />

      <Route
        path="/signup"
        element={
          <SignUp
            masterPassword={masterPassword}
            userID={userID}
            setMasterPassword={setMasterPassword}
            setUserID={setUserID}
          />
        }
      />

      <Route
        path="/login"
        element={
          <LogIn
            masterPassword={masterPassword}
            setMasterPassword={setMasterPassword}
          />
        }
      />

      <Route path="/home" element={<Home />} />
      <Route path="/home/create-password" element={<CreatePassword />} />
      <Route path="/home/view-password" element={<ViewPassword />} />

      <Route />
    </Routes>
  );
}

export default Navigation;
