import * as bip39 from "@scure/bip39";
import { wordlist as french } from "@scure/bip39/wordlists/french.js";
import CryptoJS from "crypto-js";
import { Buffer } from "buffer";

/**
 * SECURITY SERVICE
 * Gère la cryptographie de bout en bout (Zero-Knowledge).
 */
const SecurityService = {
  // --- 1. INITIALISATION DU COMPTE ---

  /**
   * Crée tout le nécessaire pour un nouvel utilisateur.
   * @param {string} masterPassword - Le mot de passe choisi par l'user.
   */
  async setupAccount(masterPassword) {
    // Génère 12 mots aléatoires
    const mnemonic = bip39.generateMnemonic(french, 128);
    // Transforme en Master Key (Entropie hexadécimale de 32 caractères)
    const masterKeyHex = this.mnemonicToMasterKey(mnemonic);
    // Calcule l'ID de synchronisation (Public ID)
    const publicId = this.generatePublicID(mnemonic);
    // Verrouille la Master Key avec le mot de passe maître
    const wrappedKey = this.wrapKey(masterKeyHex, masterPassword);

    return { mnemonic, publicId, wrappedKey, masterKeyHex };
  },

  // --- 2. GESTION DES CLÉS MAITRESSES ---

  /**
   * Calcule le Public ID (ID du document Firestore) à partir des 12 mots.
   * C'est l'ancre de synchronisation No-Email.
   */
  generatePublicID(mnemonic) {
    return CryptoJS.SHA256(mnemonic.trim().toLowerCase()).toString(
      CryptoJS.enc.Hex,
    );
  },

  /**
   * Transforme la phrase de 12 mots en Master Key.
   */
  mnemonicToMasterKey(mnemonic) {
    const entropy = bip39.mnemonicToEntropy(
      mnemonic.trim().toLowerCase(),
      french,
    );
    return Buffer.from(entropy).toString("hex");
  },

  /**
   * Chiffre la Master Key avec le mot de passe maître (Key Wrapping).
   */
  wrapKey(masterKeyHex, masterPassword) {
    return CryptoJS.AES.encrypt(masterKeyHex, masterPassword).toString();
  },

  /**
   * Déchiffre la Master Key avec le mot de passe maître.
   */
  unlockMasterKey(wrappedKey, masterPassword) {
    try {
      const bytes = CryptoJS.AES.decrypt(wrappedKey, masterPassword);
      const masterKeyHex = bytes.toString(CryptoJS.enc.Utf8);
      if (!masterKeyHex || masterKeyHex.length === 0) return null;
      return masterKeyHex;
    } catch (e) {
      return null; // Mot de passe incorrect ou données corrompues
    }
  },

  // --- 3. CHIFFREMENT DES DONNÉES (Mots de passe stockés) ---

  /**
   * Chiffre une donnée (ex: mot de passe Netflix) avec la Master Key.
   */
  encryptData(plainText, masterKeyHex) {
    if (!plainText) return "";
    return CryptoJS.AES.encrypt(plainText, masterKeyHex).toString();
  },

  /**
   * Déchiffre une donnée avec la Master Key.
   */
  decryptData(cipherText, masterKeyHex) {
    try {
      const bytes = CryptoJS.AES.decrypt(cipherText, masterKeyHex);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      if (!originalText) throw new Error();
      return originalText;
    } catch (e) {
      return "Erreur de déchiffrement";
    }
  },

  // --- 4. SÉCURITÉ ET VÉRIFICATION ---

  /**
   * Valide si une phrase de 12 mots est correcte (orthographe et checksum).
   */
  validateMnemonic(mnemonic) {
    return bip39.validateMnemonic(mnemonic.trim().toLowerCase(), french);
  },

  /**
   * Génère un "Check Hash".
   * On chiffre un mot fixe ("VERIFIED") avec la Master Key.
   * Si on arrive à le déchiffrer plus tard, c'est que notre Master Key est la bonne.
   */
  generateCheckHash(masterKeyHex) {
    return this.encryptData("VERIFIED", masterKeyHex);
  },
};

export default SecurityService;
