import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../theme/Globals";

export type Details = {
  title: string;
  content?: string[];
  bgColor: string;
};

type DetailProps = Details & { isActive: boolean };

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
    marginBottom: 10,
  },

  detailTitle: {
    padding: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  detailHeader: {
    fontSize: 24,
    fontWeight: "800",
    color: "white",
    padding: 16,
    fontFamily: theme.text.defaultFontFamily,
  },
  detailContent: {
    alignItems: "center",
    padding: 16,
  },
  text: {
    fontSize: 22,
    color: "white",
    padding: 4,
    fontFamily: theme.text.secondaryFontFamily,
  },
});

//View is used to present more details of a movie, for instance, producers, Characters ...
const DetailView = ({
  title,
  content,
  isActive = false,
  bgColor,
}: DetailProps) => {
  return (
    <View style={styles.detailContainer}>
      <View style={[styles.detailTitle, { backgroundColor: bgColor }]}>
        <Text style={styles.detailHeader}>{title}</Text>
      </View>
      {isActive && (
        <View style={[styles.detailContent, { backgroundColor: bgColor }]}>
          {content?.map((text, index) => (
            <Text style={styles.text} key={index}>
              {text}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default DetailView;
