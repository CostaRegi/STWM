import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Film } from "../graphql/QUERIES";
import { theme } from "../theme/Globals";

type FilmItemProps = {
  film: Film;
  onPress: () => void;
  index: number;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 18,
    backgroundColor: theme.itemColor,
  },
  filmTitle: {
    fontFamily: theme.text.defaultFontFamily,
    fontSize: 24,
    color: "white",
    fontWeight: "800",
  },
});

const { width } = Dimensions.get("screen");

/*
 * This component represents one of the films in the list,
 * it gets as props the index that it is on the list
 * the film to display
 * and the function to be called once it is tapped on
 */

const FilmItem = ({ film, onPress, index }: FilmItemProps) => {
  //multiply index to width in order to make items having differnt starting animated x position
  const translateX = useRef(new Animated.Value(width * 0.5 * index)).current;

  useEffect(() => {
    //Animate the display of each row by changing the position over the x axis
    Animated.spring(translateX, {
      toValue: 0,
      friction: 4,
      tension: 12,
      useNativeDriver: true,
    }).start();
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View
        style={[styles.container, { transform: [{ translateX }] }]}
      >
        <Text style={styles.filmTitle}>{film.title}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default FilmItem;
