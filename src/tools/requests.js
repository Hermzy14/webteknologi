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
export async function asyncApiRequest(endpoint, method, requestBody) {
  const fullUrl = API_URL + endpoint;
  let body = null;
  let headers = {};

  if (method.toLowerCase() !== "get" && requestBody) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(requestBody);
  }

  try {
    const response = await fetch(fullUrl, {
      method: method,
      mode: "cors",
      headers: headers,
      body: body,
    });

    // Check if response is ok (status in the range 200-299)
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
  } catch (error) {
    console.error("API Request error:", error);
    throw error;
  }
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
