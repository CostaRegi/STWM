import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import AppContainer from "./AppContainer";
import { ApolloFilmProvider } from "./context/FilmContext";
import { theme } from "./theme/Globals";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.BackgroundColor,
  },
});

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView />
      <NavigationContainer>
        <ApolloFilmProvider>
          <AppContainer />
        </ApolloFilmProvider>
      </NavigationContainer>
    </View>
  );
};

export default App;
