import { CACHE_KEYS } from "../cache/CACHE_KEYS";
import CacheService from "../cache/CacheService";
import SessionManager from "../session/SessionManager";

async function promptTouchID() {
  const res = await window.electron.promptTouchID(
    "Utiliser votre empreinte pour sécuriser vos données.",
  );

  if (res === true) {
    const masterKey = SessionManager.getMasterKey();
    if (!masterKey) throw new Error("Invalid session");
    const encryptedKey = await window.electron.encrypt(masterKey);
    CacheService.store(CACHE_KEYS.BIOMETRICS_WRAP, encryptedKey);
  }
}

export default promptTouchID;
