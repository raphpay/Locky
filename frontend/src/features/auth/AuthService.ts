import { getAuth, signInAnonymously, signOut } from "firebase/auth";

import CacheService from "../cache/CacheService";
import CACHE_KEYS from "../cache/CACHE_KEYS";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/init";
import COLLECTIONS from "../firebase/collections";
import SecurityService from "../securityService";
import SessionManager from "../session/SessionManager";
const AuthService = {
  async login(masterPassword: string): Promise<boolean | null> {
    const auth = getAuth();

    // 1. S'assurer qu'on est connecté à Firebase Auth AVANT de lire Firestore
    // Si déjà connecté, Firebase récupère la session, sinon il en crée une nouvelle.
    if (!auth.currentUser) {
      console.log("if");
      await signInAnonymously(auth);
    }

    const publicID = CacheService.retrieve(CACHE_KEYS.PUBLIC_ID) as string;

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
    console.log("data", data, data.createdAt);

    // 3. Ici tu utiliseras ton SecurityService pour déchiffrer la wrappedKey
    // avec le masterPassword reçu en argument...

    const masterKey = SecurityService.unlockMasterKey(
      data.wrappedKey,
      masterPassword,
    );

    if (!masterKey) {
      throw new Error("Invalid master password");
    }

    SessionManager.setMasterKey(masterKey);

    return true;
  },

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
