import React, { ReactNode } from "react";
import { useGetAllPokemonsQuery } from "@/store/redux-api";
import Link from "next/link";
import Image from "next/image";
import { getPokemonIndexFromUrl } from "@/utils";
import { useCallback, useState } from "react";
import { useFetchPokemonsDetails } from "@/hooks";
import { type PokemonListResponseType } from "@/types";
import { Loading, Error } from "@/components"

import styles from "./pokemonList.module.css";

type UseGetAllPokemonsQueryType = {
  data?: PokemonListResponseType;
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
}

const PokemonList:React.FC = () => {
  const [cursor, setCursor] = React.useState(0);  
  const { data =
    { count: 0, pokemonList: [{}], hasNextPage: true }, isError, isFetching }: UseGetAllPokemonsQueryType =
    useGetAllPokemonsQuery(cursor); // is Loading here is for the list, not the items, thats why we have a flickery behaviour
  const { pokemons } = useFetchPokemonsDetails({ data });
  console.log({ cursor });
  const PaginationButtons:React.FC = React.useCallback(() => (
    <span className={styles.paginationContainer}>
      <p>Viewing {cursor} of {data?.count}</p>
      <button data-testid={"previous-button"} disabled={cursor === 0 || isFetching} onClick={() => { setCursor((prev) => prev - 9) }}>Previous Page</button>
      <button data-testid={"next-button"} disabled={!data?.hasNextPage || isFetching} onClick={() => { setCursor((prev) => prev + 9) }}>Next Page</button>
    </span>
  ), [cursor, data, isFetching]);
  
  type ContainerProps = {
    children: ReactNode | [ReactNode],
  };

  // TODO: wrap this in suspense and get the loading state handeled here
  const Container: React.FC<ContainerProps> = React.useCallback(({ children }) => (
    <div className={styles.list}>{children}</div>
  ), []);

  if (isError) {
    return (
      <Container>
      <Error />
      <PaginationButtons />
      </Container>
    );
  };

  if (isFetching) {
    return (
      <Container>
        <Loading />
        <PaginationButtons />
      </Container>
    )
  };

  return (
    <Container>
        <div className={styles.itemsContainer}>
          {
            pokemons?.map(({ name, artWork }) => (
              <Link
                shallow={true}
                className={styles.item}
                data-testid={"pokemon-link"}
                href={getPokemonIndexFromUrl({ url: data?.pokemonList?.find((item) => item?.name === name)?.url })} // we can refine this to a more optimal way
                key={name}>
                <Image data-testid={"pokemon-image"} width={40} height={40} src={artWork} alt={name} />
                <span data-testid={"pokemon-name"} className={styles.name}>{name}</span>
              </Link>
            )) 
          }
      </div>
    <PaginationButtons />
  
  </Container>)
};

export default PokemonList;