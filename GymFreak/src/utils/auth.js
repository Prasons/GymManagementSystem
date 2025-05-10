// Utility functions for authentication

/**
 * Save access and refresh tokens to localStorage
 * @param {Object} tokens
 * @param {string} tokens.accessToken - The access token to save
 * @param {string} tokens.refreshToken - The refresh token to save
 */
export function saveTokens({ accessToken, refreshToken }) {
  localStorage.setItem("authToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}

/**
 * Retrieve the access token from localStorage
 * @returns {string | null} - The access token or null if not found
 */
export function getAccessToken() {
  return localStorage.getItem("authToken");
}

/**
 * Retrieve the refresh token from localStorage
 * @returns {string | null} - The refresh token or null if not found
 */
export function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}
export function setToken(accessToken) {
  localStorage.setItem("authToken", accessToken);
}

export function setAdminToken(token) {
  localStorage.setItem("adminToken", token);
}

export function getAdminToken() {
  return localStorage.getItem("adminToken");
}

/**
 * Remove access and refresh tokens from localStorage
 */
export function removeTokens() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
}

/**
 * Check if the user is authenticated
 * @returns {boolean} - True if an access token exists
 */
export function isAuthenticated() {
  return !!getAccessToken();
}
