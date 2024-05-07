import { Pokemon, PokemonDetails } from "@/types";

export const getPokemonIndexFromUrl = ({ url }: { url?: string }) => {
  if (!url) {
    return ""
  };

  const urlWithRemovedTrailingBackSlash = url.charAt(url.length - 1) === "/" ? url?.slice(0, url.length - 1): url; // remove the last '/' that the api provides in a url
  return urlWithRemovedTrailingBackSlash?.substring(urlWithRemovedTrailingBackSlash?.lastIndexOf('/') + 1) || ""
};

export const extractPokemonDetails = ({ pokemon }: { pokemon: Partial<Pokemon> }): PokemonDetails => {
  return {
    id: pokemon?.id || "",
    name: pokemon?.name || "",
    artWork: pokemon?.sprites?.other?.dream_world?.front_default || "",
    weight: pokemon?.weight || 0,
    height: pokemon?.height || 0,
    pokemonTypes: pokemon?.types?.map(({ type = { name: "" } }) => type?.name || "").join(",") || "",
    url: pokemon?.url || ""
  }
}