import { useState } from "react";
import { Route } from "react-router";
import { Routes } from "react-router";
import App from "../../App";
import SignUp from "../masterPassword/screens/SignUp";
import LogIn from "../masterPassword/screens/LogIn";
import Home from "../home/screens/Home";

function Navigation() {
  const [masterPassword, setMasterPassword] = useState<string>("");
  const [userID, setUserID] = useState<string | null>(null);

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
            userID={userID}
            setMasterPassword={setMasterPassword}
            setUserID={setUserID}
          />
        }
      />

      <Route path="/home" element={<Home />} />

      <Route />
    </Routes>
  );
}

export default Navigation;
