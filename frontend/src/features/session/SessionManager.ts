import * as bip39 from "@scure/bip39";
import { wordlist as french } from "@scure/bip39/wordlists/french.js";
import { Buffer } from "buffer";

// Private variable, not accessible from other tabs or the console
let _masterKey: string | null = null;

const SessionManager = {
  /**
   * Store the master key locally and temporarily
   * @param key The master key to be stored
   */
  setMasterKey(key: string) {
    _masterKey = key;
  },

  /**
   * Retrieve the master key locally
   * @returns The master key as a string or null if not set
   */
  getMasterKey(): string | null {
    return _masterKey;
  },

  /**
   * Clear the master key locally
   */
  clear() {
    _masterKey = null;
  },

  /**
   * Generate a new master key from a mnemonic phrase
   * @param phrase The mnemonic phrase to generate the master key from
   * @returns The master key as a string
   */
  generateMasterKey(phrase: string) {
    const entropy = bip39.mnemonicToEntropy(
      phrase.trim().toLowerCase(),
      french,
    );
    const masterKeyHex = Buffer.from(entropy).toString("hex");
    return masterKeyHex;
  },

  /**
   * Encrypt the Master Key with the master password (Key Wrapping).
   * @param masterKeyHex The master key to be encrypted
   * @param masterPassword The password to encrypt the master key with
   * @returns The encrypted master key as a string
   */
  wrapKey(masterKeyHex: string, masterPassword: string): string {
    return CryptoJS.AES.encrypt(masterKeyHex, masterPassword).toString();
  },

  /**
   * Decrypt the Master Key with the master password (Key Unwrapping).
   * @param wrappedKey The encrypted master key to be decrypted
   * @param masterPassword The password to decrypt the master key with
   * @returns The decrypted master key as a string or null if decryption fails
   */
  unlockMasterKey(wrappedKey: string, masterPassword: string): string | null {
    try {
      const bytes = CryptoJS.AES.decrypt(wrappedKey, masterPassword);
      const masterKeyHex = bytes.toString(CryptoJS.enc.Utf8);
      if (!masterKeyHex || masterKeyHex.length === 0) return null;
      return masterKeyHex;
    } catch (e) {
      console.error(e);
      return null; // Incorrect password or corrupted data
    }
  },
};

export default SessionManager;
