// utils.js
export const setSessionStorage = (key, data) => {
    sessionStorage.setItem(key, JSON.stringify(data));
  };
  