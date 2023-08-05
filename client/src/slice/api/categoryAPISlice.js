import { baseApiSlice } from './baseApiSlice';

export const categoriesApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => ({
        url: `/category/all`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.users.map(({ id }) => ({
                type: 'Category',
                id,
              })),
              { type: 'Category', id: 'LIST' },
            ]
          : [{ type: 'Category', id: 'LIST' }],
    }),
    getAllCategoryByItsUser: builder.query({
      query: () => ({
        url: `/category/user-all`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.users.map(({ id }) => ({
                type: 'Category',
                id,
              })),
              { type: 'Category', id: 'LIST' },
            ]
          : [{ type: 'Category', id: 'LIST' }],
    }),

    deleteByAdmin: builder.mutation({
      query: (id) => ({
        url: `/category/deleteByAdmin/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
    deleteByUser: builder.mutation({
      query: (id) => ({
        url: `/category/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
    createCategory: builder.mutation({
      query: (catData) => ({
        url: `/category/create`,
        method: 'POST',
        body: catData,
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useGetAllCategoryByItsUserQuery,
  useDeleteByAdminMutation,
  useDeleteByUserMutation,
  useCreateCategoryMutation,
} = categoriesApiSlice;
