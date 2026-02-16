import { doc, setDoc } from "firebase/firestore";
import SessionManager from "../session/SessionManager";
import generateWrappedKey from "../wrappedKey/generateWrappedKey";
import { db } from "../firebase/init";
import COLLECTIONS from "../firebase/collections";
import CacheService from "../cache/CacheService";
import CACHE_KEYS from "../cache/CACHE_KEYS";
import CryptoJS from "crypto-js";
import SecurityService from "../security/SecurityService";

const UserService = {
  /**
   * Generate a public ID for a user based on their mnemonic phrase.
   * It is the synchronization anchor without email.
   * @param mnemonic - The user's mnemonic phrase.
   * @returns The generated public ID.
   */
  // TODO: Make it private
  generatePublicID(masterKey: string): string {
    return CryptoJS.SHA256(masterKey).toString(CryptoJS.enc.Hex);
  },

  /**
   * Create a new user in Firestore.
   * @param uid - The user's unique identifier.
   * @param mnemonic - The user's mnemonic phrase.
   * @param masterPassword - The user's master password.
   */
  async create(mnemonic: string, masterPassword: string, pin: string) {
    const masterKey = SessionManager.generateMasterKey(mnemonic);
    const publicID = this.generatePublicID(masterKey);
    const wrappedKey = generateWrappedKey(masterKey, masterPassword);
    const localPinWrap = SecurityService.encryptData(masterKey, pin);

    try {
      await setDoc(doc(db, COLLECTIONS.USERS, publicID), {
        ownerUid: publicID,
        wrappedKey: wrappedKey,
        createdAt: new Date().toISOString(),
      });

      CacheService.store(CACHE_KEYS.PIN_WRAP, localPinWrap);
      CacheService.store(CACHE_KEYS.PUBLIC_ID, publicID);
    } catch (error) {
      console.error("Error creating user:", error);
    }

    SessionManager.setMasterKey(masterKey);
  },
};

export default UserService;
