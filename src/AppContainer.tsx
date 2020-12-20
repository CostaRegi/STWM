import { RouteProp } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import React from "react";
import { Film } from "./graphql/QUERIES";
import FilmDetailScreen from "./screens/FilmDetailScreen";
import FilmListScreen from "./screens/FilmListScreen";
import { theme } from "./theme/Globals";

type RootStackParamList = {
  Films: undefined;
  "Film Detail": { film: Film };
};

export type FilmDetailRouteProps = RouteProp<RootStackParamList, "Film Detail">;

const Stack = createStackNavigator<RootStackParamList>();
const options: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: theme.BackgroundColor,
    shadowColor: "transparent",
  },
  headerTitleStyle: {
    fontSize: 24,
    fontFamily: theme.text.defaultFontFamily,
    color: "white",
    fontWeight: "900",
  },
  headerBackTitleVisible: false,
  headerTintColor: "white",
};

//Navigation container
const AppContainer = () => {
  return (
    <Stack.Navigator initialRouteName="Films">
      <Stack.Screen name="Films" component={FilmListScreen} options={options} />
      <Stack.Screen
        name="Film Detail"
        component={FilmDetailScreen}
        options={options}
      />
    </Stack.Navigator>
  );
};

export default AppContainer;
