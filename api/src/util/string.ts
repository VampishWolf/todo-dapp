export const isJsonString = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const toQueryString = (params: Record<string, unknown>): string => {
  const queryParams = Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    )
    .join('&');

  return queryParams;
};

export const capitalize = (s: string): string => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};

export const getRandomElementOfArray = (arr: string[]): string | null => {
  if (arr.length === 0) return null; // Return null if the array is empty

  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};
