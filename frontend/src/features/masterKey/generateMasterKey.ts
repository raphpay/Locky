import * as bip39 from "@scure/bip39";
import { wordlist as french } from "@scure/bip39/wordlists/french.js";
import { Buffer } from "buffer";
export default function generateMasterKey(phrase: string): string {
  const entropy = bip39.mnemonicToEntropy(phrase.trim().toLowerCase(), french);
  const masterKeyHex = Buffer.from(entropy).toString("hex");
  return masterKeyHex;
}
