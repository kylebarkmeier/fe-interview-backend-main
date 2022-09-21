import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import flatten from 'flat';
import {
  AddCompanyParameters,
  SearchParameters,
  Company,
  EditCompanyParameters,
  UpdateCompanyParameters,
  DeleteCompanyParameters,
} from './types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/',
    paramsSerializer: (params: Record<string, any>) =>
      new URLSearchParams(flatten(params)).toString(),
  }),
  tagTypes: ['Company'],
  endpoints: (builder) => ({
    companies: builder.query<Company[], SearchParameters>({
      query: ({ id, ...params }) => ({ url: `search/${id}`, params }),
      providesTags: (result = []) => [
        { type: 'Company', id: 'LIST' },
        ...result.map(({ id }) => ({
          type: 'Company' as const,
          id: `Company-${id}`,
        })),
      ],
    }),
    addCompany: builder.mutation<Company, AddCompanyParameters>({
      query: ({ starred = false, name, description, address, image }) => ({
        url: 'search/',
        method: 'POST',
        body: { starred, name, description, address, image },
      }),
      invalidatesTags: () => [{ type: 'Company', id: 'LIST' }],
    }),
    editCompany: builder.mutation<Company, EditCompanyParameters>({
      query: ({ id, ...body }) => ({
        url: `search/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Company', id: 'LIST' },
        { type: 'Company', id: `Company-${id}` },
      ],
    }),
    updateCompany: builder.mutation<Company, UpdateCompanyParameters>({
      query: ({ id, ...body }) => ({
        url: `search/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Company', id: 'LIST' },
        { type: 'Company', id: `Company-${id}` },
      ],
    }),
    deleteCompany: builder.mutation<Company, DeleteCompanyParameters>({
      query: ({ id }) => ({
        url: `search/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Company', id: 'LIST' },
        { type: 'Company', id: `Company-${id}` },
      ],
    }),
  }),
});

export const {
  useCompaniesQuery,
  useAddCompanyMutation,
  useEditCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = api;
