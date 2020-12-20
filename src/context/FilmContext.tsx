import { ApolloProvider, useQuery } from "@apollo/client";
import React, { createContext, useContext } from "react";
import client from "../graphql/Client";
import {
  Film,
  FilmDetail,
  GET_FILM_DETAIL,
  GET_MOVIES,
} from "../graphql/QUERIES";

type FilmsState = {
  loading: boolean;
  error?: string;
  films?: Film[];
};

const initialState: FilmsState = {
  loading: true,
};

const FilmContext = createContext<FilmsState>(initialState);
type FilmProviderProps = {
  children: JSX.Element;
};

export const FilmProvider = ({ children }: FilmProviderProps) => {
  const { loading, error, data } = useQuery(GET_MOVIES);
  return (
    <FilmContext.Provider
      value={{
        films: data?.allFilms?.films,
        loading,
        error: error?.message,
      }}
    >
      {children}
    </FilmContext.Provider>
  );
};

export const ApolloFilmProvider = ({ children }: FilmProviderProps) => {
  return (
    <ApolloProvider client={client}>
      <FilmProvider>{children}</FilmProvider>
    </ApolloProvider>
  );
};

export function useFilmsContext() {
  const context = useContext(FilmContext);
  if (!context) {
    throw new Error("Film context must be used within FilmProvider");
  }
  return context;
}

export const useFilmDetail = (
  id: string
): { film: FilmDetail; loading: boolean; error?: string } => {
  console.log(id);
  const { loading, error, data } = useQuery(GET_FILM_DETAIL, {
    variables: { id },
  });
  console.log(data);
  console.log(error);

  return { loading, error: error?.message, film: data?.film };
};
