import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/init";
import CryptoJS from "crypto-js";

import generateMasterKey from "../masterKey/generateMasterKey";
import generateWrappedKey from "../wrappedKey/generateWrappedKey";
import { Collections } from "../firebase/collections";

function generatePublicID(mnemonic: string): string {
  return CryptoJS.SHA256(mnemonic.trim().toLowerCase()).toString(
    CryptoJS.enc.Hex,
  );
}

export default async function createUser(
  uid: string,
  mnemonic: string,
  masterPassword: string,
) {
  const publicID = generatePublicID(mnemonic);
  const masterKey = generateMasterKey(mnemonic);
  const wrappedKey = generateWrappedKey(masterKey, masterPassword);

  // TODO: Change the first uid with a crypted uid after master password creation ( Issue #2 )
  try {
    await setDoc(doc(db, Collections.USERS, publicID), {
      ownerUid: uid,
      wrappedKey: wrappedKey,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error creating user:", error);
  }
}
