
import { fetchPokemonsDetails } from "@/store/fetch-pokemon-details";
import { PokemonListResponseType, DefaultPokemonsDetails } from "@/types";
import { useEffect, useState } from "react";


export const useFetchPokemonsDetails = ({ data }: { data: PokemonListResponseType }) => {
  const [pokemons, setPokemons] = useState(DefaultPokemonsDetails);

  useEffect(() => {
    const fetchPokemons = async () => {
      const results = await fetchPokemonsDetails({ pokemonList: data?.pokemonList || [] });
      setPokemons(results?.details);
    }
    fetchPokemons();
  }, [data]);
  return {
    pokemons,
    // loading and error state should also be captured and serviced here for the UI to behave accordingly
  }
}