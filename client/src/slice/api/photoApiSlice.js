import { baseApiSlice } from './baseApiSlice';

export const photosApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPhotos: builder.query({
      query: () => ({
        url: `/photo/all`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.photos.map(({ id }) => ({
                type: 'Photos',
                id,
              })),
              { type: 'Photos', id: 'LIST' },
            ]
          : [{ type: 'Photos', id: 'LIST' }],
    }),
    getAllPhotosByItsUser: builder.query({
      query: () => ({
        url: `/photo/user-all`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.photos.map(({ id }) => ({
                type: 'Photos',
                id,
              })),
              { type: 'Photos', id: 'LIST' },
            ]
          : [{ type: 'Photos', id: 'LIST' }],
    }),
    getAllPhotosByItsCategory: builder.mutation({
      query: (id) => ({
        url: `/photo/get/${id}`,
        method: 'GET',
      }),
      invalidatesTags: [{ type: 'Photos', id: 'LIST' }],
    }),
    deleteByAdmin: builder.mutation({
      query: (id) => ({
        url: `/photo/deleteByAdmin/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Photos', id: 'LIST' }],
    }),
    deleteByUser: builder.mutation({
      query: (id) => ({
        url: `/photo/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Photos', id: 'LIST' }],
    }),
    createPhoto: builder.mutation({
      query: (photoData) => ({
        url: `/photo/create`,
        method: 'POST',
        body: photoData,
      }),
      invalidatesTags: [{ type: 'Photos', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAllPhotosQuery,
  useGetAllPhotosByItsUserQuery,
  useGetAllPhotosByItsCategoryMutation,
  useDeleteByAdminMutation,
  useDeleteByUserMutation,
  useCreatePhotoMutation,
} = photosApiSlice;
