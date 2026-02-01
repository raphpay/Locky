import { useState } from "react";
import "./App.css";
import signIn from "./features/auth/signIn";

import signUserOut from "./features/auth/signOut";
import createUser from "./features/user/createUser";
import generateRecoverySeed from "./features/recoverySeed/generateRecoverySeed";

function App() {
  const [password, setPassword] = useState<string>("");
  const [userID, setUserID] = useState<string | null>(null);
  const [phrase, setPhrase] = useState<string | null>(null);

  async function handleSignIn() {
    try {
      const userCred = await signIn();
      setUserID(userCred);

      const mnemonic = generateRecoverySeed();
      setPhrase(mnemonic);

      if (userCred !== null) await createUser(userCred, mnemonic, password);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  }

  async function handleSignOut() {
    await signUserOut();
    setUserID(null);
    setPhrase(null);
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your master password"
        className="border border-gray-300 p-2 rounded-sm"
      />
      <button disabled={password === ""} onClick={handleSignIn}>
        Sign in
      </button>
      {phrase && <p>{phrase}</p>}
      {userID && <p>Signed in as {userID}</p>}

      <button disabled={!userID} onClick={handleSignOut}>
        Sign out
      </button>
    </div>
  );
}

export default App;
