import SessionManager from "../../session/SessionManager";
import CacheService from "../../cache/CacheService";
import { CACHE_KEYS } from "../../cache/CACHE_KEYS";

function getAuthState() {
  const masterKey = SessionManager.getMasterKey();
  const publicID = CacheService.retrieve(CACHE_KEYS.PUBLIC_ID);

  return {
    masterKey,
    publicID,
    hasSession: !!masterKey,
    hasAccount: !!publicID,
  };
}

export default getAuthState;
