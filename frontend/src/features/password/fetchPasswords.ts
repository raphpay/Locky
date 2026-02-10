import { collection, getDocs } from "firebase/firestore";
import CACHE_KEYS from "../cache/CACHE_KEYS";
import CacheService from "../cache/CacheService";
import SessionManager from "../session/SessionManager";
import { db } from "../firebase/init";
import COLLECTIONS from "../firebase/collections";
import SecurityService from "../security/SecurityService";
import type FIRPasswordDecrypted from "./model/FIRPasswordDecrypted";
import type FIRPasswordEncrypted from "./model/FIRPasswordEncrypted";

export async function fetchPasswords(): Promise<FIRPasswordDecrypted[] | null> {
  const masterKey = SessionManager.getMasterKey();
  const publicID = CacheService.retrieve(CACHE_KEYS.PUBLIC_ID) as string;

  if (!masterKey || !publicID) {
    throw new Error("Invalid session or credentials");
  }

  const colRef = collection(
    db,
    COLLECTIONS.USERS,
    publicID,
    COLLECTIONS.PASSWORDS,
  );

  const snapshot = await getDocs(colRef);

  return snapshot.docs.map((doc) => {
    const data = doc.data() as FIRPasswordEncrypted;
    const decrypted: FIRPasswordDecrypted = {
      id: doc.id,
      username: SecurityService.decryptData(data.username_enc, masterKey),
      password: data.password_enc,
      website: SecurityService.decryptData(data.website_enc, masterKey),
      notes: data.notes_enc
        ? SecurityService.decryptData(data.notes_enc, masterKey)
        : "",
    };

    return decrypted;
  });
}
