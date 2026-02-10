import { collection, addDoc } from "firebase/firestore";
import type FormData from "./model/PasswordFormData";
import COLLECTIONS from "../firebase/collections";
import { db } from "../firebase/init";
import CacheService from "../cache/CacheService";
import CACHE_KEYS from "../cache/CACHE_KEYS";
import SessionManager from "../session/SessionManager";
import SecurityService from "../security/SecurityService";

export default async function savePassword(formData: FormData) {
  const publicID = CacheService.retrieve(CACHE_KEYS.PUBLIC_ID) as string;
  const masterKey = SessionManager.getMasterKey();

  if (!masterKey || !publicID) {
    throw new Error("Invalid session or Master key not found");
  }

  const encryptedData = {
    username_enc: SecurityService.encryptData(formData.username, masterKey),
    password_enc: SecurityService.encryptData(formData.password, masterKey),
    website_enc: SecurityService.encryptData(formData.website, masterKey),
    notes_enc: SecurityService.encryptData(formData.notes, masterKey),
    createdAt: new Date().toISOString(),
  };

  const colRef = collection(db, COLLECTIONS.USERS, publicID, "passwords");
  await addDoc(colRef, encryptedData);
}
