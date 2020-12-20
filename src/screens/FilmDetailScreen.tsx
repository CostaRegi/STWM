import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Transition,
  Transitioning,
  TransitioningView,
} from "react-native-reanimated";
import { FilmDetailRouteProps } from "../AppContainer";
import DetailView, { Details } from "../components/DetailComponent";
import Loading from "../components/Loading";
import { useFilmDetail } from "../context/FilmContext";
import { theme } from "../theme/Globals";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.BackgroundColor,
  },
  detailHeader: {
    fontSize: 24,
    fontWeight: "800",
    color: "white",
    fontFamily: theme.text.defaultFontFamily,
    padding: 16,
  },

  head: {
    fontFamily: theme.text.defaultFontFamily,
    fontSize: 18,
    lineHeight: 46,
    color: "white",
    fontWeight: "800",
  },
});

// this is the configuration to have be applied on the producer, character accordion.
const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200}></Transition.In>
    <Transition.Change></Transition.Change>
    <Transition.Out type="fade" durationMs={200}></Transition.Out>
  </Transition.Together>
);

/*
 * this is the component that we navigate too once a film is tapped on from
 * we get from the route param the film information about the row that was tapped on, and we make an
 * graphql request to load more details about the film.
 */
const FilmDetailScreen = () => {
  const [filmDetail, setFilmDetail] = useState<Details[]>();
  const route = useRoute<FilmDetailRouteProps>();
  const navigation = useNavigation();
  //Custom hooks to load more details about the film
  const { film, loading, error } = useFilmDetail(route.params.film.id);
  // Active index is used to set the accordion that is visible at given time
  const [activeIndex, setActiveIndex] = useState(0);

  const ref = useRef<TransitioningView>();

  useEffect(() => {
    //Set the title based on film selected
    navigation.setOptions({ title: route.params?.film.title });
    if (film) {
      const producers: Details = {
        title: "Producers",
        content: film.producers,
        bgColor: theme.accordionProducerColor,
      };
      const charcaters: Details = {
        title: "Characters",
        content: film.characterConnection.characters.map(
          (charcater) => charcater.name
        ),
        bgColor: theme.accordionCharacterColor,
      };
      setFilmDetail([producers, charcaters]);
    }
  }, [film, route, navigation]);

  if (loading) return <Loading />;
  if (error) return <Text>{error}</Text>;

  return (
    <Transitioning.View
      ref={ref}
      transition={transition}
      style={[styles.container, [StyleSheet.absoluteFillObject]]}
    >
      <View style={styles.detailHeader}>
        <View>
          <Text style={styles.head}>Director: {film.director}</Text>
        </View>
        <View>
          <Text style={styles.head}>Release Date: {film.releaseDate}</Text>
        </View>
      </View>
      <ScrollView style={styles.container}>
        <>
          {filmDetail?.map((detail, index) => (
            <TouchableOpacity
              key={detail.title}
              onPress={() => {
                ref.current?.animateNextTransition();
                setActiveIndex(index);
              }}
              activeOpacity={0.9}
            >
              <DetailView
                title={detail.title}
                content={detail.content}
                isActive={activeIndex === index}
                bgColor={detail.bgColor}
              />
            </TouchableOpacity>
          ))}
        </>
      </ScrollView>
    </Transitioning.View>
  );
};

export default FilmDetailScreen;
