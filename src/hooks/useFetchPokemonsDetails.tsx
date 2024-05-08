
import { store } from "@/store";
import { fetchPokemonsDetails } from "@/store/fetch-pokemon-details";
import { PokemonListResponseType, DefaultPokemonsDetails } from "@/types";
import { useEffect, useState } from "react";
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from "@/types";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

// This hook fetches the details of the pokemons, we need this on the home page to get the image Url of each pokemon shown in the list. 
export const useFetchPokemonsDetails = ({ data }: { data: PokemonListResponseType }) => {
  const [pokemons, setPokemons] = useState(DefaultPokemonsDetails);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);

  const queries = useTypedSelector(
   (state: RootState) => state.pokemons?.queries
 );

  
  useEffect(() => {
    const fetchPokemons = async () => {
      setIsFetching(true);
      try {
        const results = await fetchPokemonsDetails({ pokemonList: data?.pokemonList || [] });
        const { promisesStatus } = results;
        const fulfilled = promisesStatus?.some(( status ) => {
          return status === "fulfilled"
        });

        if (fulfilled) {
          setIsFetching(false);
        } else {
          // ENHANCEMENT
          // we need to handle this edge case, if we couldnt fetch the details at this point, RTKQuery will fetch again when the page of that pokemon is visited
          // but the listing of the pokemon wont be available on the home page so we need to gracefully unblock the UI.
        }

        setPokemons(results?.details);
      } catch (error) {
        console.error({ error });
        setIsError(true);
      }
      
    };
    fetchPokemons();
  }, [data, queries]); // I am not too worries about re-renders here since the fetch will be cached. 
  return {
    pokemons,
    isError,
    isFetching
  }
}