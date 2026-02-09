import CryptoJS from "crypto-js";

/**
 * Encrypt the master key with the master password (Key Wrapping).
 */
export default function generateWrappedKey(
  masterKeyHex: string,
  masterPassword: string,
) {
  return CryptoJS.AES.encrypt(masterKeyHex, masterPassword).toString();
}
