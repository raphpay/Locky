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

  function createPassword() {
    navigate(ROUTES.CREATE_PASSWORD);
  }

  useEffect(() => {
    setPublicID(id);
  }, [id]);

  return (
    <div className="flex flex-1 flex-col gap-2">
      <p>Home</p>

      <button className="absolute top-2 right-2" onClick={createPassword}>
        + Create a password
      </button>

      <p>Vous etes connecté en tant que {publicID}</p>
    </div>
  );
}

export default Home;
