import { addDoc, collection } from "firebase/firestore";
import { CACHE_KEYS } from "../../cache/CACHE_KEYS";
import CacheService from "../../cache/CacheService";
import { COLLECTIONS } from "../../firebase/collections";
import { db } from "../../firebase/init";
import SecurityService from "../../security/SecurityService";
import SessionManager from "../../session/SessionManager";
import type { PasswordFormData } from "../model/PasswordFormData";

export default async function savePassword(formData: PasswordFormData) {
  const publicID = CacheService.retrieve(CACHE_KEYS.PUBLIC_ID) as string;
  const masterKey = SessionManager.getMasterKey();

  if (!masterKey || !publicID) {
    throw new Error("Invalid session or Master key not found");
  }

  const encryptedData = {
    username_enc: SecurityService.encryptData(formData.username, masterKey),
    password_enc: SecurityService.encryptData(formData.password, masterKey),
    website_enc: SecurityService.encryptData(formData.website, masterKey),
    title_enc: SecurityService.encryptData(formData.title, masterKey),
    notes_enc: SecurityService.encryptData(formData.notes, masterKey),
    createdAt: new Date().toISOString(),
  };

  const colRef = collection(db, COLLECTIONS.USERS, publicID, "passwords");
  await addDoc(colRef, encryptedData);
}
