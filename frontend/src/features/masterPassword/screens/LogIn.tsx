import { useEffect, useState } from "react";
import generateRecoverySeed from "../../recoverySeed/generateRecoverySeed";
import signIn from "../../auth/signIn";
import createUser from "../../user/createUser";
import { useNavigate } from "react-router";

// import signIn from "./features/auth/signIn";

// import signUserOut from "./features/auth/signOut";
// import createUser from "./features/user/createUser";
// import generateRecoverySeed from "./features/recoverySeed/generateRecoverySeed";

interface Props {
  masterPassword: string;
  userID: string | null;
  setMasterPassword: (password: string) => void;
  setUserID: (userID: string | null) => void;
}

function LogIn({
  masterPassword,
  userID,
  setMasterPassword,
  setUserID,
}: Props) {
  const navigate = useNavigate();

  async function handleLogIn() {}

  function handleNavigateBack() {
    navigate(-1);
  }

  return (
    <div className="flex flex-col gap-2">
      <button className="absolute top-2 left-2" onClick={handleNavigateBack}>
        Retour
      </button>
      <h1>Bonjour, et bienvenue sur Locky!</h1>

      <div className="flex flex-col justify-center items-center">
        <p>Entrez maintenant votre mot de passe :</p>
        <input
          value={masterPassword}
          onChange={(e) => setMasterPassword(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
          placeholder="Master Password"
          type="password"
        />
      </div>

      {masterPassword !== "" && (
        <button onClick={handleLogIn}>Entrer dans l'application</button>
      )}

      {userID && (
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-start">
            Vous êtes connecté en tant que {userID}.
          </h2>
          {/*<button onClick={handleSignOut}>Se déconnecter</button>*/}
        </div>
      )}
    </div>
  );
}

export default LogIn;
