import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { theme } from "../theme/Globals";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.BackgroundColor,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 18,
    height: 18,
    borderRadius: 18,
    marginEnd: 10,
    backgroundColor: "white",
  },
});

//Custom loading component
const Loading = () => {
  const scale1 = useRef(new Animated.Value(1)).current;
  const scale2 = useRef(new Animated.Value(1)).current;
  const scale3 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.stagger(100, [
        Animated.timing(scale1, {
          toValue: 1.9,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(scale1, {
          toValue: 1,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(scale2, {
          toValue: 1.9,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(scale2, {
          toValue: 1,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(scale3, {
          toValue: 1.9,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(scale3, {
          toValue: 1,
          duration: 50,
          useNativeDriver: true,
        }),
      ])
    ).start();
  });
  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.circle, { transform: [{ scale: scale1 }] }]}
      />
      <Animated.View
        style={[styles.circle, { transform: [{ scale: scale2 }] }]}
      />
      <Animated.View
        style={[styles.circle, { transform: [{ scale: scale3 }] }]}
      />
    </View>
  );
};

export default Loading;
