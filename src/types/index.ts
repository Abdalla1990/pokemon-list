type PokemonType = {
  type: {
    name: string;
    url: string;
  }
  slot: number;
};

export interface Pokemon extends PokemonDetails {
  sprites: {
    other: {
      dream_world: {
        front_default: string
      }
    }
  };
  types: [PokemonType];
}

export type PokemonDetails = {
  id: string;
  name: string;
  artWork: string;
  weight: number;
  height: number;
  pokemonTypes: string;
  url: string;
}

export const DefaultPokemonsDetails = [{
  id: "",
  name: "",
  artWork: "",
  weight: 0,
  height: 0,
  pokemonTypes: ""
}];

export type PokemonListResponseType = {
  pokemonList: [Partial<Pokemon>];
  count: number;
  hasNextPage: boolean;
}

export type RootState = any // normally inferred from state