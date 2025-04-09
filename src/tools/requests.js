// Import API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Send an asynchronous request to the remote API.
 *
 * @param {string} endpoint - The API endpoint to send the request to.
 * @param {string} method - The HTTP method to use for the request.
 * @param {object} requestBody - The body of the request.
 * @returns {Promise<JSON>} - The response from the API.
 * TODO: Add error handling for the request.
 */
export function asyncApiRequest(endpoint, method, requestBody) {
  const fullUrl = API_URL + endpoint;
  let body = null;
  let headers = {};
  if (method.toLowerCase() !== "get" && requestBody) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(requestBody);
  }

  return fetch(fullUrl, {
    method: method,
    mode: "cors",
    headers: headers,
    body: body,
  })
    .then(handleErrors)
    .then((response) => response.json());
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
