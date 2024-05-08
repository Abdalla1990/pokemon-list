
import { store } from "@/store";
import { Api } from "@/store/redux-api";
import { getPokemonIndexFromUrl, extractPokemonDetails } from "@/utils";
import { PokemonListResponseType, Pokemon } from "@/types";
import { UseDispatch } from "react-redux";
type FetchPokemonsDetailsProps = {
  pokemonList: PokemonListResponseType["pokemonList"] | [];
}

export const fetchPokemonsDetails = async ({ pokemonList = [{ url: "", name: "" }] }: FetchPokemonsDetailsProps) => {
  const promises: Promise<any>[] = [];
  const promisesStatus: Array<string| undefined> = [];
  if (!pokemonList.length) {
    return { details: [] };
  }

  
  pokemonList.forEach(async ({ url }: Partial<Pokemon>) => {
    const pokemonId: string = getPokemonIndexFromUrl({ url });
    if (pokemonId) {
      promises.push(store.dispatch(Api.endpoints.getPokemonByName.initiate(pokemonId)));// we add a bunch of api calls then execute them all at once.
      promisesStatus.push(store.getState()?.pokemons?.queries?.[`getPokemonByName("${pokemonId}")`]?.status);
    }
  
  });
  
  try {
    const responses = await Promise.all(promises);
    const details = responses.map(response => extractPokemonDetails({ pokemon: response.data }));
    return { details, promisesStatus };
  } catch (error) {
    console.error(error)
    throw error; // is captured in the calling hook.
  }
};