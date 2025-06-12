
function getList(key) {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
}

function saveToList(key, item) {
  const list = getList(key);
  const exists = list.some((i) => i.id === item.id);
  if (!exists) {
    const updated = [...list, item];
    localStorage.setItem(key, JSON.stringify(updated));
  }
}

function removeFromList(key, id) {
  const updated = getList(key).filter(item => item.id !== id);
  localStorage.setItem(key, JSON.stringify(updated));
}

function isInList(key, id) {
  return getList(key).some(item => item.id === id);
}


export const favoritesUtils = {
  get: () => getList('favorites'),
  save: (item) => saveToList('favorites', item),
  remove: (id) => removeFromList('favorites', id),
  has: (id) => isInList('favorites', id),
};

export const watchedUtils = {
  get: () => getList('watched'),
  save: (item) => saveToList('watched', item),
  remove: (id) => removeFromList('watched', id),
  has: (id) => isInList('watched', id),
};