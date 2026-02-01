import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/init";

export default async function createUser(uid: string) {
  // TODO: Change the first uid with a crypted uid after master password creation ( Issue #2 )
  try {
    await setDoc(doc(db, "users", uid), {
      ownerUid: uid,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error creating user:", error);
  }
}
