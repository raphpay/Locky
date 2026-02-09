import { useNavigate } from "react-router";
import ROUTES from "../../navigation/ROUTES";
import { useEffect, useState } from "react";
import CacheService from "../../cache/CacheService";
import CACHE_KEYS from "../../cache/CACHE_KEYS";
import AuthService from "../../auth/AuthService";

function Home() {
  const navigate = useNavigate();
  const [publicID, setPublicID] = useState<string | null>(null);

  const id = CacheService.retrieve(CACHE_KEYS.PUBLIC_ID) as string;

  useEffect(() => {
    setPublicID(id);
  }, [id]);

  async function handleSignOut() {
    await AuthService.signOut();
    navigate(ROUTES.ROOT);
  }

  return (
    <div className="flex flex-1 flex-col gap-2">
      <p>Home</p>

      <button onClick={handleSignOut}>Sign Out</button>

      <p>Vous etes connecté en tant que {publicID}</p>
    </div>
  );
}

export default Home;
