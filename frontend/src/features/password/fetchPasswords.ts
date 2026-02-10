import { collection, getDocs } from "firebase/firestore";
import CACHE_KEYS from "../cache/CACHE_KEYS";
import CacheService from "../cache/CacheService";
import SessionManager from "../session/SessionManager";
import { db } from "../firebase/init";
import COLLECTIONS from "../firebase/collections";

import type PasswordFormData from "./model/PasswordFormData";

export async function fetchPasswords(): Promise<PasswordFormData[] | null> {
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
    const data = doc.data() as PasswordFormData;
    // TODO: Decrypt at least username
    return {
      id: doc.id,
      ...data,
    };
  }) as PasswordFormData[];
}
