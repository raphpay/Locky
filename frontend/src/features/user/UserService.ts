import { doc, setDoc } from "firebase/firestore";
import SessionManager from "../session/SessionManager";
import generateWrappedKey from "../wrappedKey/generateWrappedKey";
import { db } from "../firebase/init";
import COLLECTIONS from "../firebase/collections";
import CacheService from "../cache/CacheService";
import CACHE_KEYS from "../cache/CACHE_KEYS";
import CryptoJS from "crypto-js";

const UserService = {
  /**
   * Generate a public ID for a user based on their mnemonic phrase.
   * It is the synchronization anchor without email.
   * @param mnemonic - The user's mnemonic phrase.
   * @returns The generated public ID.
   */
  // TODO: Make it private
  generatePublicID(mnemonic: string): string {
    return CryptoJS.SHA256(mnemonic.trim().toLowerCase()).toString(
      CryptoJS.enc.Hex,
    );
  },

  /**
   * Create a new user in Firestore.
   * @param uid - The user's unique identifier.
   * @param mnemonic - The user's mnemonic phrase.
   * @param masterPassword - The user's master password.
   */
  async create(uid: string, mnemonic: string, masterPassword: string) {
    const publicID = this.generatePublicID(mnemonic);
    const masterKey = SessionManager.generateMasterKey(mnemonic);
    const wrappedKey = generateWrappedKey(masterKey, masterPassword);

    // TODO: Change the first uid with a crypted uid after master password creation ( Issue #2 )
    try {
      await setDoc(doc(db, COLLECTIONS.USERS, publicID), {
        ownerUid: uid,
        wrappedKey: wrappedKey,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }

    SessionManager.setMasterKey(masterKey);
    CacheService.store(CACHE_KEYS.PUBLIC_ID, publicID);
  },
};

export default UserService;
