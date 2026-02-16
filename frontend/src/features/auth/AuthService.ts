import { getAuth, signInAnonymously, signOut } from "firebase/auth";
import CacheService from "../cache/CacheService";
import CACHE_KEYS from "../cache/CACHE_KEYS";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/init";
import SessionManager from "../session/SessionManager";
import COLLECTIONS from "../firebase/collections";
import SecurityService from "../security/SecurityService";

const AuthService = {
  /**
   * Reconnect the user if needed.
   */
  async reconnectUserIfNeeded() {
    const auth = getAuth();

    // 1. S'assurer qu'on est connecté à Firebase Auth AVANT de lire Firestore
    // Si déjà connecté, Firebase récupère la session, sinon il en crée une nouvelle.
    if (!auth.currentUser) {
      await signInAnonymously(auth);
    }
  },

  /**
   * Get the current user's data from Firestore.
   * @returns The current user's data from Firestore.
   */
  async getAuthDataFromFirestore(publicID: string) {
    await this.reconnectUserIfNeeded();

    if (!publicID) {
      // If no ID, then the app is new
      // TODO: Redirect to SignUp screen
      throw new Error("No local account found.");
    }

    const userRef = doc(db, COLLECTIONS.USERS, publicID);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error("User not found on server");
    }

    const data = userSnap.data();

    return data;
  },

  /**
   * Login to the application using a master password.
   * @param masterPassword The master password to use for authentication.
   */
  async login(masterPassword: string) {
    const publicID = CacheService.retrieve(CACHE_KEYS.PUBLIC_ID) as string;
    const authData = await this.getAuthDataFromFirestore(publicID);

    // 3. Ici tu utiliseras ton SecurityService pour déchiffrer la wrappedKey
    // avec le masterPassword reçu en argument...
    const masterKey = SessionManager.unlockMasterKey(
      authData.wrappedKey,
      masterPassword,
    );

    if (!masterKey) {
      throw new Error("Invalid master password");
    }

    SessionManager.setMasterKey(masterKey);
  },

  async loginWithPin(pin: string) {
    const publicID = CacheService.retrieve(CACHE_KEYS.PUBLIC_ID) as string;

    try {
      const localPin = CacheService.retrieve(CACHE_KEYS.PIN_WRAP) as string;

      if (!localPin || !publicID) {
        throw new Error("No local account found on this device");
      }

      const decryptedMasterKey = SecurityService.decryptData(localPin, pin);

      // If the pin is valid, decrypt the master key
      if (!decryptedMasterKey) {
        throw new Error("Invalid PIN");
      }

      SessionManager.setMasterKey(decryptedMasterKey);
      await this.reconnectUserIfNeeded();
      return true;
    } catch (error) {
      console.error("Error logging in with PIN:", error);
      throw error;
    }
  },

  /**
   * Sign in anonymously using Firebase Authentication.
   * @returns The user ID if successful, null otherwise.
   */
  async signIn(): Promise<string | null> {
    const auth = getAuth();

    try {
      const userCredential = await signInAnonymously(auth);
      return userCredential.user.uid;
    } catch (error) {
      console.error("Error signing in:", error);
    }

    return null;
  },

  /**
   * Sign out using Firebase Authentication.
   */
  async signOut() {
    const auth = getAuth();
    try {
      await signOut(auth);
      SessionManager.clear();
    } catch (error) {
      console.error(error);
    }
  },
};
export default AuthService;
