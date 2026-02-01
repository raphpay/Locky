import * as bip39 from "@scure/bip39";
import { wordlist as french } from "@scure/bip39/wordlists/french.js";

export default function generateRecoverySeed(): string {
  const mnemonic = bip39.generateMnemonic(french, 128);
  return mnemonic;
}
