import secureLocalStorage from "react-secure-storage";
const CacheService = {
  /**
   * Store a value in the cache.
   * @param key - The key to store the value under.
   * @param value - The value to store.
   */
  store(key: string, value: string | object) {
    secureLocalStorage.setItem(key, value);
  },

  /**
   * Retrieve a value from the cache.
   * @param key - The key to retrieve the value from.
   * @returns The value stored under the key, or null if not found.
   */
  retrieve(key: string): string | object | number | boolean | null {
    return secureLocalStorage.getItem(key);
  },

  /**
   * Remove a value from the cache.
   * @param key - The key to remove the value from.
   */
  remove(key: string) {
    secureLocalStorage.removeItem(key);
  },

  /**
   * Clear all values from the cache.
   */
  clear() {
    secureLocalStorage.clear();
  },
};
export default CacheService;
