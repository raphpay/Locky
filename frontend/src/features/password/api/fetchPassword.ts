import { doc, getDoc } from "firebase/firestore"; // Import au singulier
import SessionManager from "../../session/SessionManager";
import CacheService from "../../cache/CacheService";
import type FIRPasswordDecrypted from "../model/FIRPasswordDecrypted";
import COLLECTIONS from "../../firebase/collections";
import { db } from "../../firebase/init";
import SecurityService from "../../security/SecurityService";
import type FIRPasswordEncrypted from "../model/FIRPasswordEncrypted";
import CACHE_KEYS from "../../cache/CACHE_KEYS";

export async function fetchPassword(id: string): Promise<FIRPasswordDecrypted> {
  const masterKey = SessionManager.getMasterKey();
  const publicID = CacheService.retrieve(CACHE_KEYS.PUBLIC_ID) as string;

  if (!masterKey || !publicID) {
    throw new Error("Invalid session or credentials");
  }

  const docRef = doc(
    db,
    COLLECTIONS.USERS,
    publicID,
    COLLECTIONS.PASSWORDS,
    id,
  );

  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("Password not found");
  }

  const data = docSnap.data() as FIRPasswordEncrypted;

  return {
    id: docSnap.id,
    username: SecurityService.decryptData(data.username_enc, masterKey),
    password: SecurityService.decryptData(data.password_enc, masterKey),
    website: SecurityService.decryptData(data.website_enc, masterKey),
    notes: data.notes_enc
      ? SecurityService.decryptData(data.notes_enc, masterKey)
      : "",
  };
}
