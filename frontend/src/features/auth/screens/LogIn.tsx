import { useNavigate } from "react-router";
import ROUTES from "../../navigation/ROUTES";
import AuthService from "../AuthService";
import CacheService from "../../cache/CacheService";

interface Props {
  masterPassword: string;
  setMasterPassword: (password: string) => void;
}

function LogIn({ masterPassword, setMasterPassword }: Props) {
  const navigate = useNavigate();

  function handleNavigateBack() {
    navigate(ROUTES.ROOT);
  }

  async function handleLogIn() {
    await AuthService.login(masterPassword);
    navigate(ROUTES.HOME);
  }

  async function handleForceSignOut() {
    await AuthService.signOut();
    CacheService.clear();
    navigate(ROUTES.ROOT);
  }

  return (
    <div className="flex flex-col gap-2">
      <button className="absolute top-2 left-2" onClick={handleNavigateBack}>
        Retour
      </button>
      <button className="absolute top-2 right-2" onClick={handleForceSignOut}>
        Force Sign out
      </button>
      <h2 className="font-bold text-2xl">Les mots de passe sont bloqués</h2>

      <div className="flex flex-col justify-center items-center">
        <p>Entrez votre mot de passe pour dévérouiller l'app</p>
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
    </div>
  );
}

export default LogIn;
