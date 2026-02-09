import secureLocalStorage from "react-secure-storage";
const CacheService = {
  store(key: string, value: string | object) {
    secureLocalStorage.setItem(key, value);
  },

  retrieve(key: string): string | object | number | boolean | null {
    return secureLocalStorage.getItem(key);
  },

  remove(key: string) {
    secureLocalStorage.removeItem(key);
  },

  clear() {
    secureLocalStorage.clear();
  },
};
export default CacheService;
