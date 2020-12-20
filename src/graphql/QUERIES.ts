import { gql } from "@apollo/client";

export type Film = {
  title: string;
  id: string;
};

export type FilmDetail = {
  producers: string[];
  releaseDate: string;
  director: string;
  characterConnection: {
    characters: [{ name: string }];
  };
};

export type AllFilms = {
  allFilms: {
    films: Film[];
  };
};

const GET_MOVIES = gql`
  query {
    allFilms {
      films {
        title
        id
      }
    }
  }
`;

const GET_FILM_DETAIL = gql`
  query Film($id: ID) {
    film(id: $id) {
      producers
      director
      releaseDate
      characterConnection {
        characters {
          name
        }
      }
    }
  }
`;

export { GET_MOVIES, GET_FILM_DETAIL };
