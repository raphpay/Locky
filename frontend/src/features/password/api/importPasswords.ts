import { collection, doc, writeBatch } from "firebase/firestore";
import CACHE_KEYS from "../../cache/CACHE_KEYS";
import CacheService from "../../cache/CacheService";
import SessionManager from "../../session/SessionManager";
import Papa from "papaparse";
import { db } from "../../firebase/init";
import COLLECTIONS from "../../firebase/collections";
import SecurityService from "../../security/SecurityService";

export default async function importPasswords(file: File) {
  const masterKey = SessionManager.getMasterKey() as string;
  const publicID = CacheService.retrieve(CACHE_KEYS.PUBLIC_ID) as string;

  if (!masterKey && !publicID) {
    throw new Error("Invalid session");
  }

  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          // We use a batch to write all the documents in a single transaction
          const batch = writeBatch(db);
          const colRef = collection(
            db,
            COLLECTIONS.USERS,
            publicID,
            COLLECTIONS.PASSWORDS,
          );

          results.data.forEach((row: any) => {
            if (!row.URL || !row.Password) return;

            const newDocRef = doc(colRef);
            batch.set(newDocRef, {
              title_enc: SecurityService.encryptData(
                row.Title ?? "",
                masterKey,
              ),
              website_enc: SecurityService.encryptData(row.URL, masterKey),
              password_enc: SecurityService.encryptData(
                row.Password,
                masterKey,
              ),
              username_enc: SecurityService.encryptData(
                row.Username || "",
                masterKey,
              ),
              notes_enc: SecurityService.encryptData(
                row.Notes || "",
                masterKey,
              ),
              createdAt: new Date().toISOString(),
            });
          });

          console.log("batch", batch);

          await batch.commit();
          console.log("resolve");
          resolve(true);
        } catch (error) {
          reject(error);
        }
      },
    });
  });
}
