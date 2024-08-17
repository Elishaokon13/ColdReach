import { apiSlice } from "./api";

const routeSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    authenticate: builder.mutation({
      query: (body) => ({
        url: "/auth",
        method: "POST",
        body,
      }),
    }),

    prompt: builder.mutation({
      query: ({ data, token }) => ({
        url: "/prompt",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useAuthenticateMutation, usePromptMutation } = routeSlice;
