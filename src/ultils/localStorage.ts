export const getFromLocalStorage = (k: string) => {
  try {
    const s = localStorage.getItem(k);
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
};
export const saveToLocalStorage = (k: string, v: any) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {}
};
