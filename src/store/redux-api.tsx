import type { Action, PayloadAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { Pokemon, RootState } from "@/types";


function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE
}

export const Api = createApi({
  reducerPath: 'pokemons',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }), // this should be stored in .env or added to env vars in github for env-specific urls.
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) { // for SSR
      return action.payload[reducerPath]
    }
  },
  
  endpoints: (builder) => ({
    getAllPokemons: builder.query({
      query: (cursor) => `pokemon?offset=${cursor}&limit=${9}`,
      transformResponse: async (response: any, meta: any, arg: any) => {
        return ({ pokemonList: response.results, count: response.count, hasNextPage: response.count > arg })
      },
    }),
    getPokemonByName: builder.query<Pokemon, string>({
      query: (number) => `pokemon/${number}`,
    }),
    
  }),
})

export const { useGetPokemonByNameQuery, useLazyGetAllPokemonsQuery, useGetAllPokemonsQuery } = Api
