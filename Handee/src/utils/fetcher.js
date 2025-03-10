import { API_BASE_URL } from "./apiClient"; // Import base URL if needed

export const fetcher = async (endpoint) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    credentials: "include", // Include cookies for authentication
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `HTTP error! Status: ${response.status}`);
  }

  return response.json();
};
