export async function apiClient(url, method = "GET", body = null) {
  const API_URL = process.env.NEXT_PUBLIC_SERVER_URL; // Get base URL from .env file
  const fullUrl = `${API_URL}${url}`; 
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", 
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(fullUrl, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong!");                                                                                                                                                                                                                                                                                                                                                                                                                                      
    }

    return await response.json();
  } catch (error) {
    console.error("API Client Error:", error);
    throw error;
  }
}
