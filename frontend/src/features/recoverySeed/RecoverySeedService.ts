import * as bip39 from "@scure/bip39";
import { wordlist as french } from "@scure/bip39/wordlists/french.js";
import { Buffer } from "buffer";

const RecoverySeedService = {
  /**
   * Generate a new recovery seed.
   * @returns The generated recovery seed as a string.
   */
  generateRecoverySeed(): string {
    const mnemonic = bip39.generateMnemonic(french, 128);
    return mnemonic;
  },

  /**
   * Transform the 12 words phrase into Master Key.
   * @param mnemonic - The mnemonic phrase to transform.
   * @returns The master key as a hexadecimal string.
   */
  mnemonicToMasterKey(mnemonic: string) {
    const entropy = bip39.mnemonicToEntropy(
      mnemonic.trim().toLowerCase(),
      french,
    );
    return Buffer.from(entropy).toString("hex");
  },

  /**
   * Validate if a mnemonic is valid ( spelling and checksum ).
   * @param mnemonic - The mnemonic phrase to validate.
   * @returns True if the mnemonic is valid, false otherwise.
   */
  validateMnemonic(mnemonic: string) {
    return bip39.validateMnemonic(mnemonic.trim().toLowerCase(), french);
  },
};

export default RecoverySeedService;
