import { useState } from "react";
import "./App.css";
import signIn from "./features/auth/signIn";

import signUserOut from "./features/auth/signOut";
import createUser from "./features/user/createUser";

function App() {
  const [userID, setUserID] = useState<string | null>(null);

  async function handleSignIn() {
    try {
      const userCred = await signIn();
      setUserID(userCred);
      if (userCred !== null) await createUser(userCred);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  }

  async function handleSignOut() {
    await signUserOut();
    setUserID(null);
  }

  return (
    <>
      <button onClick={handleSignIn}>Sign in</button>
      {userID && <p>Signed in as {userID}</p>}

      <button onClick={handleSignOut}>Sign out</button>
    </>
  );
}

export default App;
