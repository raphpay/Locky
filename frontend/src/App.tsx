import { useState } from "react";
import "./App.css";
import signIn from "./features/auth/signIn";

import signUserOut from "./features/auth/signOut";
import createUser from "./features/user/createUser";
import generateRecoverySeed from "./features/recoverySeed/generateRecoverySeed";
import SignIn from "./features/masterPassword/screens/SignIn";

function App() {
  const [userID, setUserID] = useState<string | null>(null);
  const [masterPassword, setMasterPassword] = useState<string>("");

  async function handleSignOut() {
    await signUserOut();
    setUserID(null);
    // setPhrase(null);
  }

  return (
    <>
      <SignIn
        masterPassword={masterPassword}
        setMasterPassword={setMasterPassword}
      />
    </>
  );
}

export default App;
