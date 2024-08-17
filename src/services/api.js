import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PROD = process.env.NEXT_PUBLIC_API_URL;

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: PROD }),
  endpoints: () => ({}),
});

//state === "live" ? PROD : DEV
