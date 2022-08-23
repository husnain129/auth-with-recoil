const storage = {
  set: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get: (key: string) => {
    return JSON.parse(localStorage.getItem(key) as string);
  },
  delete: (key: string) => {
    localStorage.removeItem(key);
  },
};

export default storage;
