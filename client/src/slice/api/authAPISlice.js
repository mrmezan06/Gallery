import { baseApiSlice } from './baseApiSlice';
import { logout } from '../authSlice';

export const authApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: `/auth/register`,
        method: 'POST',
        body: userData,
      }),
    }),
    verifyUser: builder.mutation({
      query: (userdata) => ({
        url: '/auth/verify',
        method: 'POST',
        body: userdata,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: `/auth/login`,
        method: 'POST',
        body: credentials,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: `/auth/logout`,
        method: 'GET',
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          dispatch(logout());
          dispatch(baseApiSlice.util.resetApiState());
        } catch (err) {
          console.log(err);
        }
      },
    }),
    resendVerifyEmail: builder.mutation({
      query: (userEmail) => ({
        url: `/auth/resend_token`,
        method: 'POST',
        body: userEmail,
      }),
    }),
    passwordResetRequest: builder.mutation({
      query: (formData) => ({
        url: `/auth/reset_password_request`,
        method: 'POST',
        body: formData,
      }),
    }),
    resetPassword: builder.mutation({
      query: (formData) => ({
        url: `/auth/reset_password`,
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useVerifyUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useResendVerifyEmailMutation,
  usePasswordResetRequestMutation,
  useResetPasswordMutation,
} = authApiSlice;
