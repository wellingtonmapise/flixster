/**
 * Retrieves a list of items from localStorage for the given key.
 * @param {string} key - The localStorage key to retrieve.
 * @returns {Array<Object>} - The parsed list or an empty array.
 */

function getList(key) {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
}

/**
 * Adds an item to the list in localStorage, avoiding duplicates by id.
 * @param {string} key - The localStorage key.
 * @param {Object} item - The item to save (must have an `id` field).
 */

function saveToList(key, item) {
  const list = getList(key);
  const exists = list.some((i) => i.id === item.id);
  if (!exists) {
    const updated = [...list, item];
    localStorage.setItem(key, JSON.stringify(updated));
  }
}

/**
 * Removes an item from the list in localStorage by id.
 * @param {string} key - The localStorage key.
 * @param {number|string} id - The id of the item to remove.
 */

function removeFromList(key, id) {
  const updated = getList(key).filter((item) => item.id !== id);
  localStorage.setItem(key, JSON.stringify(updated));
}

/**
 * Checks if an item with the given id exists in the list.
 * @param {string} key - The localStorage key.
 * @param {number|string} id - The id to check for.
 * @returns {boolean} - True if the item is in the list, false otherwise.
 */

function isInList(key, id) {
  return getList(key).some((item) => item.id === id);
}

/**
 * Utility functions to manage the "favorites" list in localStorage.
 *
 * Methods:
 * - get: Retrieve all favorited items.
 * - save: Add a new item to favorites (if it doesn't already exist).
 * - remove: Remove an item from favorites by ID.
 * - has: Check if an item exists in favorites by ID.
 */

export const favoritesUtils = {
  get: () => getList("favorites"),
  save: (item) => saveToList("favorites", item),
  remove: (id) => removeFromList("favorites", id),
  has: (id) => isInList("favorites", id),
};

/**
 * Utility functions to manage the "watched" list in localStorage.
 *
 * Methods:
 * - get: Retrieve all watched items.
 * - save: Add a new item to watched (if it doesn't already exist).
 * - remove: Remove an item from watched by ID.
 * - has: Check if an item exists in watched by ID.
 */

export const watchedUtils = {
  get: () => getList("watched"),
  save: (item) => saveToList("watched", item),
  remove: (id) => removeFromList("watched", id),
  has: (id) => isInList("watched", id),
};
