import { deleteDoc, doc } from "firebase/firestore";
import COLLECTIONS from "../../firebase/collections";
import { db } from "../../firebase/init";
import CacheService from "../../cache/CacheService";
import CACHE_KEYS from "../../cache/CACHE_KEYS";
import SessionManager from "../../session/SessionManager";

export default async function deletePassword(id: string) {
  const publicID = CacheService.retrieve(CACHE_KEYS.PUBLIC_ID) as string;
  const masterKey = SessionManager.getMasterKey();

  if (!masterKey || !publicID) {
    throw new Error("Invalid session or Master key not found");
  }

  const docRef = doc(
    db,
    COLLECTIONS.USERS,
    publicID,
    COLLECTIONS.PASSWORDS,
    id,
  );
  await deleteDoc(docRef);
}
