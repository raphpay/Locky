import { useState } from "react";
import "./App.css";
import signIn from "./features/auth/signIn";
import { type UserCredential as FIRUser } from "firebase/auth";
import signUserOut from "./features/auth/signOut";

function App() {
  const [user, setUser] = useState<FIRUser | null>(null);

  async function handleSignIn() {
    const userCred = await signIn();
    setUser(userCred);
  }

  async function handleSignOut() {
    await signUserOut();
    setUser(null);
  }

  return (
    <>
      <button onClick={handleSignIn}>Sign in</button>
      {user && <p>Signed in as {user.user.uid}</p>}

      <button onClick={handleSignOut}>Sign out</button>
    </>
  );
}

export default App;
