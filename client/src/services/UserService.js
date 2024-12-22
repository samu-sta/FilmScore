import { API_URLS, BASE_URL } from '../../../constants/constants.js';

export async function registerUser(data) {

  const response = await fetch(`${BASE_URL}${API_URLS.REGISTER}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();

}



export async function loginUser(data) {
  const response = await fetch(`${BASE_URL}${API_URLS.LOGIN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });
  return await response.json();
}

export async function deleteUser() {
  const response = await fetch(`${BASE_URL}${API_URLS.PROFILE}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  return await response.json();
}

export async function getUserProfile() {
  const response = await fetch(`${BASE_URL}${API_URLS.PROFILE}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  return await response.json();
}

export async function putUserProfile(data) {
  const response = await fetch(`${BASE_URL}${API_URLS.PROFILE}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });
  return await response.json();
}

export async function changePassword(password) {
  await fetch(`${BASE_URL}${API_URLS.PASSWORD}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: password,
    }),
    credentials: 'include',
  });
}

export async function getUserId() {
  const response = await fetch(`${BASE_URL}${API_URLS.EMAIL}`, {
    method: 'GET',
    credentials: 'include',
  });
  return await response.json();
}

