import { useGetPokemonByNameQuery } from "@/store/redux-api";
import { DefaultPokemonsDetails } from "@/types";
import { extractPokemonDetails } from "@/utils";
import { useRouter } from "next/router";
import Image from "next/image";
import { Loading, Error } from "@/components"

import styles from "./Pokemon.module.css";

const DetailsContent:React.FC<{ content: { key: string; value: string | number; } }> = ({ content }) =>
  <span className={styles.itemContainer}>
    <p data-testid="pokemon-key" className={styles.itemKey}>{content.key}: </p>
    <p data-testid="pokemon-value" className={styles.itemValue}>{content.value}</p>
  </span>;

const Pokemon: React.FC = () => {
  const router = useRouter();
  const pokemonId = router?.asPath?.split("/")[1];
  const { data = DefaultPokemonsDetails[0], isFetching, isError } = useGetPokemonByNameQuery(pokemonId); // this should fetch from the cache first
  const pokemonDetails = extractPokemonDetails({ pokemon: data });
  
  if (isFetching) return <Loading />;
  if (isError) return <Error />;

  return (
    <div>
      <Image src={pokemonDetails.artWork} width={200} height={200} alt={pokemonDetails.name} />
      <DetailsContent
        content={{
          key: "Name",
          value: pokemonDetails.name
        }}
      />
      <DetailsContent
        content={{
          key: "Weight",
          value: pokemonDetails.weight
        }}
      />
      <DetailsContent
        content={{
          key: "Height",
          value: pokemonDetails.height
        }}
      />
      <DetailsContent
        content={{
          key: "Types",
          value: pokemonDetails.pokemonTypes
        }}
      />
    </div>
  );
};

export default Pokemon;