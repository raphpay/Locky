import { doc, updateDoc } from "firebase/firestore";
import COLLECTIONS from "../../firebase/collections";
import { db } from "../../firebase/init";
import CacheService from "../../cache/CacheService";
import CACHE_KEYS from "../../cache/CACHE_KEYS";
import SessionManager from "../../session/SessionManager";
import SecurityService from "../../security/SecurityService";
import type FIRPasswordDecrypted from "../model/FIRPasswordDecrypted";

export default async function updatePassword(formData: FIRPasswordDecrypted) {
  const publicID = CacheService.retrieve(CACHE_KEYS.PUBLIC_ID) as string;
  const masterKey = SessionManager.getMasterKey();

  if (!masterKey || !publicID) {
    throw new Error("Invalid session or Master key not found");
  }

  const encryptedData = {
    id: formData.id,
    username_enc: SecurityService.encryptData(formData.username, masterKey),
    password_enc: SecurityService.encryptData(formData.password, masterKey),
    website_enc: SecurityService.encryptData(formData.website, masterKey),
    notes_enc: SecurityService.encryptData(formData.notes, masterKey),
    updatedAt: new Date().toISOString(),
  };

  const docRef = doc(db, COLLECTIONS.USERS, publicID, "passwords", formData.id);
  await updateDoc(docRef, encryptedData);
}
