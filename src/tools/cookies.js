/**
 * Get value of a specific cookie by name.
 *
 * @param name Cookie name to retrieve.
 * @returns {string} Value of the cookie or an empty string if not found.
 */
export function getCookie(name) {
  name = name + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

/**
 * Store a local cookie with a specified name, value, and expiration time.
 *
 * @param name Name of the cookie.
 * @param value Value of the cookie.
 * @param days Number of days until the cookie expires.
 */
export function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

/**
 * Delete a cookie by name.
 *
 * @param name Name of the cookie to delete.
 */
export function deleteCookie(name) {
  setCookie(name, "", -1);
}
