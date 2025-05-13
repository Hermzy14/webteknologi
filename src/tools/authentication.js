import { deleteCookie, getCookie, setCookie } from "./cookies";
import { asyncApiRequest } from "./requests";

/**
 * Get the currently authenticated user.
 *
 * @returns User object if authenticated, null otherwise.
 */
export function getAuthenticatedUser() {
  let user = null;
  const username = getCookie("current_username");
  const commaSeparatedRoles = getCookie("current_user_roles");
  if (username && commaSeparatedRoles) {
    const roles = commaSeparatedRoles.split(",");
    user = {
      username: username,
      roles: roles,
    };
  }
  return user;
}

/**
 * Check if the given user is an admin.
 *
 * @param user The user object to check.
 * @returns {boolean} True if the user is an admin, false otherwise.
 */
export function isAdmin(user) {
  if (!user || !user.role) return false;
  return user.role.some(
    (role) => typeof role === "string" && role.toUpperCase() === "ADMIN"
  );
}

/**
 * Send authentication request to the API.
 *
 * @param username The username of the user.
 * @param password The password of the user.
 * @param successCallback Callback function to execute on successful authentication.
 * @param errorCallback Callback function to execute on authentication failure.
 */
export async function sendAuthenticationRequest(
  username,
  password,
  successCallback,
  errorCallback
) {
  const postData = {
    username: username,
    password: password,
  };
  try {
    const jwtResponse = await asyncApiRequest("/users/login", "POST", postData);
    if (jwtResponse && jwtResponse.jwt) {
      setCookie("jwt", jwtResponse.jwt);
      const userData = parseJwtUser(jwtResponse.jwt);
      if (userData) {
        setCookie("current_username", userData.username);
        setCookie("current_user_roles", userData.roles.join(","));
        successCallback(userData);
      }
    }
  } catch (httpError) {
    errorCallback(httpError.message);
  }
}

/**
 * Parse JWT token to extract information from it.
 *
 * @param token The JWT token to parse.
 * @returns {any} Decoded JWT object.
 */
function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

/**
 * Parse JWT token to extract user information.
 *
 * @param jwtString The JWT token string to parse.
 * @returns User object.
 */
function parseJwtUser(jwtString) {
  let user = null;
  const jwtObject = parseJwt(jwtString);
  if (jwtObject) {
    user = {
      username: jwtObject.sub,
      roles: jwtObject.role.map((r) => r.authority),
    };
  }
  return user;
}

/**
 * Delete all cookies related to authorization (user session)
 */
export function deleteAuthorizationCookies() {
  deleteCookie("jwt");
  deleteCookie("current_username");
  deleteCookie("current_user_roles");
}
