import { getAuth, signOut } from "firebase/auth";

export default async function signUserOut() {
  const auth = getAuth();
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
}
