import { getAuth, signOut } from "firebase/auth";
import SessionManager from "../session/SessionManager";

export default async function signUserOut() {
  const auth = getAuth();
  try {
    await signOut(auth);
    SessionManager.clear();
  } catch (error) {
    console.error(error);
  }
}
