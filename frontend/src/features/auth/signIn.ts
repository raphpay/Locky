import { getAuth, signInAnonymously } from "firebase/auth";

export default async function signIn(): Promise<string | null> {
  const auth = getAuth();

  try {
    const userCredential = await signInAnonymously(auth);
    return userCredential.user.uid;
  } catch (error) {
    console.error("Error signing in:", error);
  }

  return null;
}
