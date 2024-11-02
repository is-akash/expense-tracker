import { UserType } from "./../../../types/index";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL,
    }),
    reducerPath: "api",
    tagTypes: ["Users"],
    endpoints: (build) => ({
        createUser: build.mutation<UserType, Partial<UserType>>({
            query: (user) => ({
                url: "users",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["Users"],
        }),
    }),
});

export const { useCreateUserMutation } = api;
