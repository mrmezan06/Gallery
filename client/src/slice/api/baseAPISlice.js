import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { baseUrl } from '../../app/baseUrl';

import { login, logout } from '../authSlice';
// TODO: Change this to your own base API URL
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.user?.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let response = await baseQuery(args, api, extraOptions);
  if (response?.error?.originalStatus === 403) {
    const refreshResponse = await baseQuery(
      `/auth/new_access_token`,
      api,
      extraOptions
    );

    if (refreshResponse?.data) {
      api.dispatch(login({ ...refreshResponse.data }));
      response = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return response;
};

export const baseApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ['User', 'Photo', 'Category'], //Cached data will be tagged with these types
  endpoints: (builder) => ({}),
});
