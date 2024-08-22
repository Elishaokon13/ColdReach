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

    becomePro: builder.mutation({
      query: ({ body, token }) => ({
        url: "/auth/become-pro",
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useAuthenticateMutation, usePromptMutation, useBecomeProMutation } = routeSlice;
