import CryptoJS from "crypto-js";

/**
 * SECURITY SERVICE
 * Gère la cryptographie de bout en bout (Zero-Knowledge).
 */
const SecurityService = {
  // --- DATA ENCRYPTION ( Passwords saved ) ---

  /**
   * Encrypt a data ( ex: Netflix password ) with the master key.
   * @param plainText - The plain text to encrypt.
   * @param masterKeyHex - The master key in hexadecimal format.
   * @returns The encrypted data as a string.
   */
  encryptData(plainText: string, masterKeyHex: string): string {
    if (!plainText) return "";
    return CryptoJS.AES.encrypt(plainText, masterKeyHex).toString();
  },

  /**
   * Decrypt a data ( ex: Netflix password ) with the master key.
   * @param cipherText - The cipher text to decrypt.
   * @param masterKeyHex - The master key in hexadecimal format.
   * @returns The decrypted data as a string.
   */
  decryptData(cipherText: string, masterKeyHex: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(cipherText, masterKeyHex);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      if (!originalText) throw new Error();
      return originalText;
    } catch (e) {
      console.error("Error decrypting data", e);
      throw new Error("Error decrypting data");
    }
  },

  // --- 4. SECURITY AND VERIFICATION ---

  /**
   * Generate a check hash.
   * Encrypt the "VERIFIED" string with the master key.
   * If we can decrypt it later, it means our master key is correct.
   * @param masterKeyHex - The master key in hexadecimal format.
   * @returns The check hash as a string.
   */
  generateCheckHash(masterKeyHex: string): string {
    return this.encryptData("VERIFIED", masterKeyHex);
  },
};

export default SecurityService;
