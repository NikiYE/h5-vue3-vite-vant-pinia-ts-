const storage = {
  setItem(key: string, value: any) {
    // 如果 value 是对象，则使用 JSON.stringify，否则直接存储
    const valueToStore =
      typeof value === "object" ? JSON.stringify(value) : value;
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  removeItem(key: string) {
    localStorage.removeItem(key);
  },
};

export { storage };
