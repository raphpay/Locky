import { collection, doc, writeBatch } from "firebase/firestore";
import Papa from "papaparse";
import { CACHE_KEYS } from "../../cache/CACHE_KEYS";
import CacheService from "../../cache/CacheService";
import { COLLECTIONS } from "../../firebase/collections";
import { db } from "../../firebase/init";
import SecurityService from "../../security/SecurityService";
import SessionManager from "../../session/SessionManager";
import type FIRPasswordDecrypted from "../model/FIRPasswordDecrypted";

export default async function importPasswords(
  file: File,
  existingPasswords: FIRPasswordDecrypted[],
) {
  const masterKey = SessionManager.getMasterKey() as string;
  const publicID = CacheService.retrieve(CACHE_KEYS.PUBLIC_ID) as string;

  if (!masterKey || !publicID) throw new Error("Invalid session");

  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          const batch = writeBatch(db);
          const colRef = collection(
            db,
            COLLECTIONS.USERS,
            publicID,
            COLLECTIONS.PASSWORDS,
          );

          results.data.forEach((row: any) => {
            if (!row.URL || !row.Password) return;

            // 1. Search for a dubplicate
            const duplicate = existingPasswords.find(
              (p) =>
                p.website?.toLowerCase() === row.URL.toLowerCase() &&
                p.username === (row.Username || ""),
            );

            // 2. If duplicate, we get its existing ID, else we create a new doc
            const docRef = duplicate ? doc(colRef, duplicate.id) : doc(colRef);

            // 3. Prepare the encrypted data
            const encryptedPayload = {
              title_enc: SecurityService.encryptData(
                row.Title || row.URL,
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
              updatedAt: new Date().toISOString(),
            };

            // 4. Merge: We set the old data if duplicate
            batch.set(
              docRef,
              duplicate
                ? encryptedPayload
                : { ...encryptedPayload, createdAt: new Date().toISOString() },
              { merge: true },
            );
          });

          await batch.commit();
          resolve(true);
        } catch (error) {
          reject(error);
        }
      },
    });
  });
}
