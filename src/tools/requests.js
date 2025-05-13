import { getCookie } from "./cookies";

// Import API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Send an asynchronous request to the remote API.
 *
 * @param {string} endpoint - The API endpoint to send the request to.
 * @param {string} method - The HTTP method to use for the request.
 * @param {object} requestBody - The body of the request.
 * @returns {Promise<JSON>} - The response from the API.
 */
export async function asyncApiRequest(endpoint, method = "GET", body = null) {
  const fullUrl = API_URL + endpoint;
  const headers = {
    "Content-Type": "application/json",
  };

  // Add JWT token if available
  const jwt = getCookie("jwt");
  if (jwt) {
    headers["Authorization"] = `Bearer ${jwt}`;
  }

  const options = {
    method,
    headers,
    credentials: "include",
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(fullUrl, options);

  if (!response.ok) {
    // Try to parse error response as JSON first
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Server returned ${response.status}`
      );
    } else {
      // If not JSON, get text
      const errorText = await response.text();
      throw new Error(errorText || `Server returned ${response.status}`);
    }
  }

  // Handle empty responses
  const contentType = response.headers.get("content-type");
  if (response.status === 204 || !contentType) {
    return { success: true };
  }

  // Parse JSON responses
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  }

  // For non-JSON responses
  const textResponse = await response.text();
  return { data: textResponse };
}

/**
 * Handle errors from the fetch request.
 *
 * @param {Response} response - The response from the fetch request.
 * @returns {Response} - The response if it is ok, otherwise throws an error.
 */
function handleErrors(response) {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`); //TODO: Create custom error
  }
  return response;
}
