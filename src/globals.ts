// Dynamically get the base URL, trim it, and append :8443
const base = window.location.origin.replace(/:\d+$/, '');
export const API_ENDPOINT = `${base}:8443/api`;
export const COLORS_API_ENDPOINT = `${API_ENDPOINT}/colors`;
