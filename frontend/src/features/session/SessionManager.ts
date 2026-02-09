import * as bip39 from "@scure/bip39";
import { wordlist as french } from "@scure/bip39/wordlists/french.js";
import { Buffer } from "buffer";

// Private variable, not accessible from other tabs or the console
let _masterKey: string | null = null;

const SessionManager = {
  setMasterKey(key: string) {
    _masterKey = key;
  },

  getMasterKey(): string | null {
    return _masterKey;
  },

  clear() {
    _masterKey = null;
  },

  generateMasterKey(phrase: string) {
    const entropy = bip39.mnemonicToEntropy(
      phrase.trim().toLowerCase(),
      french,
    );
    const masterKeyHex = Buffer.from(entropy).toString("hex");
    return masterKeyHex;
  },
};

export default SessionManager;
