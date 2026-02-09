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
};

export default SessionManager;
