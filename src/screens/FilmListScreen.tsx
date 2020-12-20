import { useIsFocused, useNavigation } from "@react-navigation/native";
import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import FilmItem from "../components/FilmItem";
import Loading from "../components/Loading";
import { useFilmsContext } from "../context/FilmContext";
import { Film } from "../graphql/QUERIES";
import { theme } from "../theme/Globals";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    paddingTop: 20,
    backgroundColor: theme.BackgroundColor,
  },
  separator: {
    height: 8,
    backgroundColor: "transparent",
    marginLeft: 0,
  },
});

/*
 * This is the home component that contains the list of star wars movies,
 * the list is displayed based on the response from graphql no sorting logic is applied
 */

const FilmListScreen = () => {
  const navigation = useNavigation();
  //use custom hooks to get the result of the graphql call
  const { error, loading, films } = useFilmsContext();
  //This hooks comes from react navigation and it will make sure that the list is always animated on display
  const isFocused = useIsFocused();

  if (error) {
    return <Text>{error}</Text>;
  }
  //if still loading return custom loading component
  if (loading) {
    return <Loading />;
  }

  //Function to be called once one of the films is selected
  const navigateOnPress = (item: Film) => {
    navigation.navigate("Film Detail", { film: item });
  };

  return (
    <View style={styles.container}>
      {isFocused && (
        <Animated.FlatList
          data={films}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <FilmItem
              film={item}
              index={index + 1}
              onPress={() => navigateOnPress(item)}
            />
          )}
        />
      )}
    </View>
  );
};

export default FilmListScreen;
