// utils/api.ts

import { getAccessToken, getRefreshToken, saveTokens, logout } from "./auth";

const BASE_URL = "https://nexlearn.noviindusdemosites.in";

export const api = async (endpoint: string, options: RequestInit = {}) => {
  let accessToken = getAccessToken();

  let response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Accept": "application/json",
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // ----------------------------------------
  // Token expired → refresh and retry request
  // ----------------------------------------
  if (response.status === 401) {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      logout();
      return;
    }

    const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    const refreshData = await refreshRes.json();

    // refresh failed
    if (!refreshData?.access_token) {
      logout();
      return;
    }

    // save new tokens
    saveTokens(refreshData.access_token, refreshData.refresh_token);

    // retry original request
    accessToken = refreshData.access_token;

    response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Accept": "application/json",
        ...(options.headers || {}),
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return response.json();
};
